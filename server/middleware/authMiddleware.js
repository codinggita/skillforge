const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect — verifies the Bearer JWT in the Authorization header.
 *
 * On success  → attaches the full User document to req.user and calls next().
 * On failure  → responds 401 immediately.
 *
 * Usage:
 *   router.get("/profile", protect, profileController);
 */
const protect = async (req, res, next) => {
  try {
    // ── 1. Extract token ───────────────────────────────────────────────────
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // ── 2. Verify token ────────────────────────────────────────────────────
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const message =
        err.name === "TokenExpiredError"
          ? "Token has expired. Please log in again."
          : "Invalid token. Authentication failed.";

      return res.status(401).json({ success: false, message });
    }

    // ── 3. Fetch user (exclude password) ──────────────────────────────────
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User belonging to this token no longer exists.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Contact support.",
      });
    }

    // ── 4. Attach user and continue ────────────────────────────────────────
    req.user = user;
    next();
  } catch (error) {
    console.error("authMiddleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
  }
};

/**
 * restrictTo — role-based access control, must be used AFTER protect.
 *
 * Usage:
 *   router.delete("/project/:id", protect, restrictTo("admin", "instructor"), deleteProject);
 *
 * @param  {...string} roles - Allowed roles (e.g. "admin", "instructor")
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${roles.join(", ")}.`,
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };
