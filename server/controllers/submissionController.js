const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Submission = require("../models/Submission");
const Project = require("../models/Project");
const SkillScore = require("../models/SkillScore");
const { reviewCode } = require("../utils/aiReviewer");

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Map an AI review result into the embedded aiReview sub-document shape
 * defined in Submission.js.
 */
function buildAiReviewDoc(review) {
  return {
    council: review.council || [],
    summary: review.summary || review.feedback,
    strengths: review.strengths || [],
    improvements: review.suggestions || [],
    codeQualityScore: review.codeQualityScore ?? null,
    readabilityScore: review.readabilityScore ?? null,
    efficiencyScore: review.efficiencyScore ?? null,
    suggestedRefactor: "",
    reviewedAt: review.reviewedAt || new Date(),
    modelUsed: review.modelUsed || "gpt-3.5-turbo",
  };
}

/**
 * Persist AI dimension scores to the user's SkillScore document.
 * Each dimension uses updateDimension() which recalculates the running
 * average and overall score automatically.
 *
 * @param {string|ObjectId} userId
 * @param {object}          dimensionScores  - { debugging, problemSolving, … }
 * @param {string|ObjectId} submissionId
 */
async function persistSkillScores(userId, dimensionScores, submissionId) {
  const skillScore = await SkillScore.findOrCreate(userId);

  const dimensions = [
    "debugging",
    "problemSolving",
    "codeQuality",
    "timeManagement",
    "conceptApplication",
  ];

  for (const dim of dimensions) {
    const raw = dimensionScores[dim];
    if (typeof raw === "number" && !isNaN(raw)) {
      skillScore.updateDimension(dim, raw, submissionId);
    }
  }

  await skillScore.save();
  return skillScore;
}

// ─── Controllers ──────────────────────────────────────────────────────────────

/**
 * @desc    Submit code for a project, run AI review, update SkillScore
 * @route   POST /api/submissions
 * @access  Private (protect)
 */
const createSubmission = async (req, res) => {
  // ── 1. Validate ─────────────────────────────────────────────────────────
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { projectId, code, language, timeTakenMinutes } = req.body;
  const userId = req.user._id;

  try {
    // ── 2. Verify project exists and is published ──────────────────────────
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }
    if (!project.isPublished) {
      return res
        .status(403)
        .json({
          success: false,
          message: "This project is not yet published.",
        });
    }

    // ── 3. Calculate attempt number and mark previous as not-latest ────────
    // Use atomic operation to avoid race condition
    const lastSubmission = await Submission.findOneAndUpdate(
      { userId, projectId },
      { $set: { isLatest: false } },
      { sort: { createdAt: -1 }, new: true },
    );

    const attemptNumber = lastSubmission ? lastSubmission.attemptNumber + 1 : 1;

    // ── 4. Create the submission in "pending" state ────────────────────────
    const submission = await Submission.create({
      userId,
      projectId,
      code,
      language,
      timeTakenMinutes: timeTakenMinutes ?? null,
      status: "pending",
      attemptNumber,
      isLatest: true,
    });

    // ── 5. Return immediately so the client isn't blocked ──────────────────
    res.status(202).json({
      success: true,
      message: "Submission received. AI review is in progress.",
      submissionId: submission._id,
      attemptNumber,
    });

    // ── 6. Run AI review asynchronously ───────────────────────────────────
    setImmediate(async () => {
      const maxRetries = 3;
      let attempt = 0;
      let success = false;

      while (attempt < maxRetries && !success) {
        try {
          attempt++;

          // Mark as running
          await Submission.findByIdAndUpdate(submission._id, {
            status: "ai_reviewing",
            $inc: { retryCount: 1 },
          });

          const review = await reviewCode({
            code,
            language,
            projectTitle: project.title,
            projectDescription: project.description,
            timeTakenMinutes: timeTakenMinutes ?? null,
            projectTags: project.tags || [],
          });

          // Convert 1-10 score → 0-100 for Submission.score field
          const scoreOutOf100 = Math.round((review.score / 10) * 100);

          // Build the embedded aiReview sub-document
          const aiReviewDoc = buildAiReviewDoc(review);

          // Persist updated submission
          await Submission.findByIdAndUpdate(submission._id, {
            status: "completed",
            score: scoreOutOf100,
            aiReview: aiReviewDoc,
          });

          // Update project aggregate statistics
          await updateProjectStats(projectId, scoreOutOf100);

          // Persist dimension scores to SkillScore
          await persistSkillScores(
            userId,
            review.dimensionScores,
            submission._id,
          );

          console.log(
            `✅ AI review complete — submission ${submission._id} | score ${review.score}/10 (attempt ${attempt})`,
          );
          success = true;
        } catch (err) {
          console.error(
            `❌ AI review attempt ${attempt} failed for submission ${submission._id}:`,
            err.message,
          );

          if (attempt >= maxRetries) {
            // Max retries reached, mark as failed
            await Submission.findByIdAndUpdate(submission._id, {
              status: "failed",
              feedback: `AI review failed after ${maxRetries} attempts: ${err.message}`,
            }).catch(() => {});
          } else {
            // Wait before retry (exponential backoff)
            await new Promise((resolve) =>
              setTimeout(resolve, Math.pow(2, attempt) * 1000),
            );
          }
        }
      }
    });
  } catch (error) {
    console.error("createSubmission error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating submission.",
    });
  }
};

/**
 * @desc    Get a single submission by ID (owner or admin only)
 * @route   GET /api/submissions/:id
 * @access  Private
 */
const getSubmission = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: "Submission not found." });
    }
    const submission = await Submission.findById(req.params.id)
      .populate("projectId", "title category difficulty")
      .populate("userId", "name email");

    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found." });
    }

    // Only the owner or an admin may view
    const isOwner =
      submission.userId._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied." });
    }

    return res.status(200).json({ success: true, submission });
  } catch (error) {
    console.error("getSubmission error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * @desc    Get all submissions for the authenticated user (optionally filtered by project)
 * @route   GET /api/submissions/me
 * @access  Private
 */
const getMySubmissions = async (req, res) => {
  try {
    const filter = { userId: req.user._id };
    if (req.query.projectId) filter.projectId = req.query.projectId;
    if (req.query.latestOnly === "true") filter.isLatest = true;

    const submissions = await Submission.find(filter)
      .populate("projectId", "title category difficulty")
      .sort({ createdAt: -1 })
      .limit(50);

    return res
      .status(200)
      .json({ success: true, count: submissions.length, submissions });
  } catch (error) {
    console.error("getMySubmissions error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * @desc    Poll submission status (for the client to check AI review progress)
 * @route   GET /api/submissions/:id/status
 * @access  Private
 */
const getSubmissionStatus = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).select(
      "status score aiReview passedTestCases totalTestCases updatedAt",
    );

    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found." });
    }

    return res.status(200).json({
      success: true,
      status: submission.status,
      score: submission.score,
      aiReview: submission.aiReview,
      updatedAt: submission.updatedAt,
    });
  } catch (error) {
    console.error("getSubmissionStatus error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Recalculate and store the rolling average score on the project document.
 */
async function updateProjectStats(projectId, newScore) {
  try {
    const project = await Project.findById(projectId).select(
      "submissionCount averageScore",
    );
    if (!project) return;

    const prevTotal =
      (project.averageScore || 0) * (project.submissionCount || 0);
    const newCount = (project.submissionCount || 0) + 1;
    const newAvg = Math.round((prevTotal + newScore) / newCount);

    await Project.findByIdAndUpdate(projectId, {
      submissionCount: newCount,
      averageScore: newAvg,
    });
  } catch (err) {
    console.error("updateProjectStats error:", err.message);
  }
}

module.exports = {
  createSubmission,
  getSubmission,
  getMySubmissions,
  getSubmissionStatus,
};
