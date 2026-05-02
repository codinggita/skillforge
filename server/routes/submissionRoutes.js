const express = require("express");
const { body, param } = require("express-validator");
const {
  createSubmission,
  getSubmission,
  getMySubmissions,
  getSubmissionStatus,
} = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes require a logged-in user
router.use(protect);

// ─── Validation Rules ─────────────────────────────────────────────────────────

const SUPPORTED_LANGUAGES = [
  "javascript", "typescript", "python", "java",
  "cpp", "c", "go", "rust", "ruby", "php", "swift", "kotlin", "other",
];

const createSubmissionRules = [
  body("projectId")
    .trim()
    .notEmpty().withMessage("projectId is required.")
    .isMongoId().withMessage("projectId must be a valid MongoDB ObjectId."),

  body("code")
    .notEmpty().withMessage("Submitted code cannot be empty.")
    .isLength({ min: 1, max: 200000 })
    .withMessage("Code must be between 1 and 200,000 characters."),

  body("language")
    .trim()
    .notEmpty().withMessage("language is required.")
    .toLowerCase()
    .isIn(SUPPORTED_LANGUAGES)
    .withMessage(`language must be one of: ${SUPPORTED_LANGUAGES.join(", ")}.`),

  body("timeTakenMinutes")
    .optional()
    .isFloat({ min: 0, max: 1440 })
    .withMessage("timeTakenMinutes must be a number between 0 and 1440."),
];

const mongoIdParam = (field) =>
  param(field)
    .isMongoId()
    .withMessage(`${field} must be a valid MongoDB ObjectId.`);

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * @route   POST /api/submissions
 * @desc    Submit code → trigger async AI review → 202 Accepted
 */
router.post("/", createSubmissionRules, createSubmission);

/**
 * @route   GET /api/submissions/me
 * @desc    Get all submissions for the current user
 * @query   ?projectId=<id>   filter by project
 * @query   ?latestOnly=true  return only the latest per project
 */
router.get("/me", getMySubmissions);

/**
 * @route   GET /api/submissions/:id/status
 * @desc    Poll AI review progress for a specific submission
 */
router.get("/:id/status", mongoIdParam("id"), getSubmissionStatus);

/**
 * @route   GET /api/submissions/:id
 * @desc    Get full submission details (owner or admin)
 */
router.get("/:id", mongoIdParam("id"), getSubmission);

module.exports = router;
