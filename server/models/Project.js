const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 10,
      min: [0, "Points cannot be negative"],
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    hints: {
      type: [String],
      default: [],
    },
  },
  { _id: true }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },

    difficulty: {
      type: String,
      required: [true, "Difficulty level is required"],
      enum: {
        values: ["beginner", "intermediate", "advanced", "expert"],
        message: "Difficulty must be one of: beginner, intermediate, advanced, expert",
      },
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "web-development",
        "data-structures",
        "algorithms",
        "machine-learning",
        "databases",
        "system-design",
        "mobile-development",
        "devops",
        "cybersecurity",
        "other",
      ],
    },

    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 20,
        message: "A project can have at most 20 tags",
      },
    },

    tasks: {
      type: [TaskSchema],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 50,
        message: "A project can have at most 50 tasks",
      },
    },

    // Time limit in minutes (null = no limit)
    timeLimit: {
      type: Number,
      default: null,
      min: [1, "Time limit must be at least 1 minute"],
    },

    // Who created this project
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Starter code per language
    starterCode: {
      type: Map,
      of: String, // e.g. { "javascript": "// start here", "python": "# start here" }
      default: {},
    },

    // Supported submission languages
    supportedLanguages: {
      type: [String],
      default: ["javascript"],
    },

    // Expected output for auto-grading
    testCases: [
      {
        input: { type: String, default: "" },
        expectedOutput: { type: String, required: true },
        isHidden: { type: Boolean, default: false },
        points: { type: Number, default: 5 },
      },
    ],

    maxScore: {
      type: Number,
      default: 100,
      min: [1, "Max score must be at least 1"],
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    // Skill areas this project targets
    skillTargets: {
      type: [String],
      default: [],
    },

    submissionCount: {
      type: Number,
      default: 0,
    },

    averageScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: total points available across all tasks
ProjectSchema.virtual("totalTaskPoints").get(function () {
  if (!this.tasks) return 0;
  return this.tasks.reduce((sum, task) => sum + (task.points || 0), 0);
});

// Indexes
ProjectSchema.index({ category: 1, difficulty: 1 });
ProjectSchema.index({ tags: 1 });
ProjectSchema.index({ isPublished: 1 });
ProjectSchema.index({ createdBy: 1 });
ProjectSchema.index({ title: "text", description: "text", tags: "text" }); // full-text search

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
