const mongoose = require("mongoose");

const AiReviewSchema = new mongoose.Schema(
  {
    council: {
      type: [
        new mongoose.Schema(
          { persona: String, comment: String },
          { _id: false },
        ),
      ],
      default: [],
    },
    summary: {
      type: String,
      default: "",
    },
    strengths: {
      type: [String],
      default: [],
    },
    improvements: {
      type: [String],
      default: [],
    },
    codeQualityScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },
    readabilityScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },
    efficiencyScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },
    suggestedRefactor: {
      type: String,
      default: "",
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    modelUsed: {
      type: String, // e.g. "gemini-1.5-pro", "gpt-4o"
      default: "",
    },
  },
  { _id: false },
);

const TestResultSchema = new mongoose.Schema(
  {
    testCaseId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    actualOutput: {
      type: String,
      default: "",
    },
    expectedOutput: {
      type: String,
      default: "",
    },
    executionTimeMs: {
      type: Number,
      default: null,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "projectId is required"],
    },

    code: {
      type: String,
      required: [true, "Submitted code is required"],
      maxlength: [200000, "Code cannot exceed 200,000 characters"],
    },

    language: {
      type: String,
      required: [true, "Programming language is required"],
      trim: true,
      lowercase: true,
      enum: {
        values: [
          "javascript",
          "typescript",
          "python",
          "java",
          "cpp",
          "c",
          "go",
          "rust",
          "ruby",
          "php",
          "swift",
          "kotlin",
          "other",
        ],
        message: "Unsupported programming language",
      },
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: [
          "pending", // just submitted, awaiting execution
          "running", // currently being judged
          "accepted", // all test cases passed
          "wrong_answer", // at least one test case failed
          "runtime_error",
          "time_limit_exceeded",
          "compilation_error",
          "partial", // some test cases passed
          "ai_reviewing", // passed tests, AI review pending
          "completed", // fully reviewed by AI
          "failed", // AI review failed after retries
        ],
        message: "Invalid submission status",
      },
      default: "pending",
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    timeTakenMinutes: {
      type: Number,
      default: null,
      min: 0,
    },

    attemptNumber: {
      type: Number,
      default: 1,
      min: 1,
    },

    testResults: {
      type: [TestResultSchema],
      default: [],
    },

    passedTestCases: {
      type: Number,
      default: 0,
    },

    totalTestCases: {
      type: Number,
      default: 0,
    },

    aiReview: {
      type: AiReviewSchema,
      default: () => ({}),
    },

    feedback: {
      type: String, // optional manual instructor feedback
      default: "",
    },

    isLatest: {
      type: Boolean, // true for the most recent submission per user+project
      default: true,
    },

    retryCount: {
      type: Number,
      default: 0,
      min: 0,
      max: 3, // max retries
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual: pass rate for this submission
SubmissionSchema.virtual("passRate").get(function () {
  if (!this.totalTestCases) return 0;
  return Math.round((this.passedTestCases / this.totalTestCases) * 100);
});

// Compound indexes
SubmissionSchema.index({ userId: 1, projectId: 1, createdAt: -1 });
SubmissionSchema.index({ projectId: 1, status: 1 });
SubmissionSchema.index({ userId: 1, isLatest: 1 });
SubmissionSchema.index({ status: 1, createdAt: 1 }); // for job queues

const Submission = mongoose.model("Submission", SubmissionSchema);
module.exports = Submission;
