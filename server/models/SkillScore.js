const mongoose = require("mongoose");

// Reusable sub-schema for a single skill dimension
const SkillDimensionSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      default: 0,
      min: [0, "Score cannot be negative"],
      max: [100, "Score cannot exceed 100"],
    },
    // Running total and count allow incremental average updates
    // without retrieving all submissions
    totalPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    submissionCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastUpdated: {
      type: Date,
      default: null,
    },
    trend: {
      type: String,
      enum: ["improving", "declining", "stable", "new"],
      default: "new",
    },
    history: [
      {
        score: { type: Number, required: true, min: 0, max: 100 },
        recordedAt: { type: Date, default: Date.now },
        submissionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Submission",
        },
      },
    ],
  },
  { _id: false },
);

const SkillScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
      unique: true, // one SkillScore document per user
    },

    scores: {
      debugging: {
        type: SkillDimensionSchema,
        default: () => ({}),
      },
      problemSolving: {
        type: SkillDimensionSchema,
        default: () => ({}),
      },
      codeQuality: {
        type: SkillDimensionSchema,
        default: () => ({}),
      },
      timeManagement: {
        type: SkillDimensionSchema,
        default: () => ({}),
      },
      conceptApplication: {
        type: SkillDimensionSchema,
        default: () => ({}),
      },
    },

    // Composite/overall score — weighted average of all dimensions
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Tier based on overall score
    tier: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum", "diamond"],
      default: "bronze",
    },

    // Total projects submitted (for leaderboard / rank context)
    totalSubmissions: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Global leaderboard rank (updated periodically by a cron job)
    globalRank: {
      type: Number,
      default: null,
    },

    collegeRank: {
      type: Number,
      default: null,
    },

    // Weights used for computing overallScore (can be tuned per cohort)
    weights: {
      debugging: { type: Number, default: 0.2 },
      problemSolving: { type: Number, default: 0.25 },
      codeQuality: { type: Number, default: 0.2 },
      timeManagement: { type: Number, default: 0.15 },
      conceptApplication: { type: Number, default: 0.2 },
    },

    lastRecalculated: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Instance Methods ─────────────────────────────────────────────────────────

/**
 * Recompute overallScore from current dimension scores and weights,
 * then set the appropriate tier. Call this after updating any dimension.
 */
SkillScoreSchema.methods.recalculate = function () {
  const { scores, weights } = this;
  const dims = [
    "debugging",
    "problemSolving",
    "codeQuality",
    "timeManagement",
    "conceptApplication",
  ];

  const weighted = dims.reduce((sum, dim) => {
    return sum + (scores[dim]?.score || 0) * (weights[dim] || 0);
  }, 0);

  this.overallScore = Math.round(weighted * 10) / 10;
  this.tier = getTier(this.overallScore);
  this.lastRecalculated = new Date();
};

/**
 * Update a single skill dimension with a new data point and
 * recalculate the running average and trend.
 *
 * @param {string} dimension - e.g. "debugging"
 * @param {number} newScore  - score for this submission (0–100)
 * @param {ObjectId} submissionId
 */
SkillScoreSchema.methods.updateDimension = function (
  dimension,
  newScore,
  submissionId,
) {
  const dim = this.scores[dimension];
  if (!dim) throw new Error(`Unknown dimension: ${dimension}`);

  const previousScore = dim.score;

  dim.totalPoints += newScore;
  dim.submissionCount += 1;
  dim.score = Math.round((dim.totalPoints / dim.submissionCount) * 10) / 10;
  dim.lastUpdated = new Date();

  // Keep last 20 history entries to avoid unbounded growth
  dim.history.push({ score: newScore, submissionId, recordedAt: new Date() });
  if (dim.history.length > 20) dim.history.shift();

  // Trend: compare new average to old average
  if (dim.submissionCount === 1) {
    dim.trend = "new";
  } else if (dim.score > previousScore + 2) {
    dim.trend = "improving";
  } else if (dim.score < previousScore - 2) {
    dim.trend = "declining";
  } else {
    dim.trend = "stable";
  }

  this.totalSubmissions += 1;
  this.recalculate();
};

// ─── Statics ─────────────────────────────────────────────────────────────────

/**
 * Find or create a SkillScore document for a user.
 */
SkillScoreSchema.statics.findOrCreate = async function (userId) {
  try {
    let doc = await this.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId } },
      { upsert: true, new: true },
    );
    return doc;
  } catch (error) {
    // If upsert fails, try find again
    return await this.findOne({ userId });
  }
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTier(score) {
  if (score >= 90) return "diamond";
  if (score >= 75) return "platinum";
  if (score >= 55) return "gold";
  if (score >= 35) return "silver";
  return "bronze";
}

// ─── Indexes ─────────────────────────────────────────────────────────────────

// SkillScoreSchema.index({ userId: 1 }, { unique: true }); // Automatically created by unique: true in schema
SkillScoreSchema.index({ overallScore: -1 }); // global leaderboard
SkillScoreSchema.index({ tier: 1, overallScore: -1 });

const SkillScore = mongoose.model("SkillScore", SkillScoreSchema);
module.exports = SkillScore;
