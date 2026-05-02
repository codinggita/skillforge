const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getSkillScore,
  getProgress,
  getBadges,
  getStreak,
  getLeaderboard,
} = require("../controllers/analyticsController");

const router = express.Router();
router.use(protect);


/**
 * @route   GET /api/analytics/skillscore
 * @desc    Get logged-in user's 5-dimension SkillScore (radar chart data)
 * @returns { radarData[], overallScore, tier, globalRank, collegeRank, totalSubmissions }
 */
router.get("/skillscore", getSkillScore);

/**
 * @route   GET /api/analytics/progress
 * @desc    Get submission history with scores over time (line chart data)
 * @query   ?limit=30         how many past submissions (max 100)
 * @query   ?projectId=<id>   filter to one project
 * @returns { timeline[], categoryAverages[], totalCompleted, bestScore, averageScore }
 */
router.get("/progress", getProgress);

/**
 * @route   GET /api/analytics/badges
 * @desc    Calculate earned badges + persist any newly earned ones to User
 * @returns { earned[], locked[], newlyEarned, totalEarned, completionPct }
 */
router.get("/badges", getBadges);

/**
 * @route   GET /api/analytics/streak
 * @desc    Get current streak + 60-day activity heatmap
 * @returns { current, longest, heatmap[], activeDaysTotal, message }
 */
router.get("/streak", getStreak);

/**
 * @route   GET /api/analytics/leaderboard
 * @desc    Get top 50 users ranked by XP + current user's rank
 * @query   ?filter=week|month|all
 */
router.get("/leaderboard", getLeaderboard);

module.exports = router;

