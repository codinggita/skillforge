const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String, // URL or emoji / icon key
      default: "",
    },
    awardedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // never returned in queries by default
    },

    college: {
      type: String,
      trim: true,
      default: "",
    },

    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },

    skills: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 50,
        message: "A user can have at most 50 skills",
      },
    },

    badges: {
      type: [BadgeSchema],
      default: [],
    },

    streak: {
      current: {
        type: Number,
        default: 0,
        min: 0,
      },
      longest: {
        type: Number,
        default: 0,
        min: 0,
      },
      lastActiveDate: {
        type: Date,
        default: null,
      },
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: full profile URL (example usage)
UserSchema.virtual("profileUrl").get(function () {
  return `/users/${this._id}`;
});

// Index for fast email lookups (unique is already defined in schema)
UserSchema.index({ college: 1 });
UserSchema.index({ "streak.current": -1 });

const User = mongoose.model("User", UserSchema);
module.exports = User;
