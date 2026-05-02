const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const SkillScore = require("../models/SkillScore");

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Generate a signed JWT for a user.
 * @param {string} id - MongoDB user _id
 * @returns {string} signed JWT
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

/**
 * Strip sensitive fields and return a safe user object for API responses.
 * @param {Document} user - Mongoose User document
 * @returns {object}
 */
const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  college: user.college,
  role: user.role,
  skills: user.skills,
  badges: user.badges,
  streak: user.streak,
  avatar: user.avatar,
  bio: user.bio,
  isVerified: user.isVerified,
  createdAt: user.createdAt,
});

// ─── Controllers ──────────────────────────────────────────────────────────────

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  // ── 1. Validate request body ─────────────────────────────────────────────
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array()
      .map((e) => ({ field: e.path, message: e.msg }));
    console.log("Registration validation errors:", formattedErrors);
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  const { name, email, password, college } = req.body;

  try {
    // ── 2. Check for duplicate email ───────────────────────────────────────
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // ── 3. Hash password ───────────────────────────────────────────────────
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ── 4. Create user ─────────────────────────────────────────────────────
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      college: college?.trim() || "",
    });

    // ── 5. Initialise SkillScore document for the new user ─────────────────
    await SkillScore.findOrCreate(user._id);

    // ── 6. Generate token ──────────────────────────────────────────────────
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration. Please try again.",
    });
  }
};

/**
 * @desc    Login an existing user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  // ── 1. Validate request body ─────────────────────────────────────────────
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array()
      .map((e) => ({ field: e.path, message: e.msg }));
    console.log("Login validation errors:", formattedErrors);
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  const { email, password } = req.body;

  try {
    // ── 2. Find user (include password for comparison) ─────────────────────
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!user) {
      // Generic message prevents email enumeration
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ── 3. Check account status ────────────────────────────────────────────
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Please contact support.",
      });
    }

    // ── 4. Compare password ────────────────────────────────────────────────
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ── 5. Update streak ───────────────────────────────────────────────────
    await updateLoginStreak(user);

    // ── 6. Generate token ──────────────────────────────────────────────────
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login. Please try again.",
    });
  }
};

/**
 * @desc    Get the currently authenticated user's profile
 * @route   GET /api/auth/me
 * @access  Private (requires protect middleware)
 */
const getMe = async (req, res) => {
  try {
    // req.user is already populated by authMiddleware
    return res.status(200).json({
      success: true,
      user: sanitizeUser(req.user),
    });
  } catch (error) {
    console.error("getMe error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching profile.",
    });
  }
};

// ─── Streak Helper ────────────────────────────────────────────────────────────

/**
 * Increment the user's streak if they log in on a new calendar day.
 * Resets the streak to 1 if more than one day has been skipped.
 */
async function updateLoginStreak(user) {
  try {
    const now = new Date();
    const today = startOfDay(now);
    const lastActive = user.streak?.lastActiveDate
      ? startOfDay(new Date(user.streak.lastActiveDate))
      : null;

    // Already logged in today — no change
    if (lastActive && lastActive.getTime() === today.getTime()) return;

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let newCurrent;
    if (!lastActive || lastActive.getTime() < yesterday.getTime()) {
      // Streak broken
      newCurrent = 1;
    } else {
      // Consecutive day
      newCurrent = (user.streak?.current || 0) + 1;
    }

    const newLongest = Math.max(user.streak?.longest || 0, newCurrent);

    await User.findByIdAndUpdate(user._id, {
      "streak.current": newCurrent,
      "streak.longest": newLongest,
      "streak.lastActiveDate": now,
    });

    // Reflect changes in the in-memory object for the response
    user.streak.current = newCurrent;
    user.streak.longest = newLongest;
    user.streak.lastActiveDate = now;
  } catch (err) {
    // Non-critical — don't fail the login if streak update errors
    console.error("updateLoginStreak error:", err.message);
  }
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

module.exports = { register, login, getMe };
