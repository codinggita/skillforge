const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const projectRoutes = require("./projectRoutes");
const submissionRoutes = require("./submissionRoutes");
const analyticsRoutes = require("./analyticsRoutes");

const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Increased limit so hot-reloads and /me calls don't trigger 429
  message: "Too many authentication attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

router.use("/auth", authLimiter, authRoutes);
router.use("/projects", projectRoutes);
router.use("/submissions", submissionRoutes);
router.use("/analytics", analyticsRoutes);

module.exports = router;
