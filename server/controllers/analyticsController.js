const SkillScore  = require("../models/SkillScore");
const Submission  = require("../models/Submission");
const User        = require("../models/User");

// ─────────────────────────────────────────────────────────────────────────────
// Badge definitions — each badge has a check() that receives context
// and returns true if the badge should be awarded.
// ─────────────────────────────────────────────────────────────────────────────
const BADGE_DEFINITIONS = [
  // ── Submission milestones ─────────────────────────────────────────────────
  {
    id:          "first_submit",
    name:        "First Step",
    description: "Submitted your very first project.",
    icon:        "🚀",
    check:       ({ totalSubmissions }) => totalSubmissions >= 1,
  },
  {
    id:          "ten_submissions",
    name:        "Getting Serious",
    description: "Completed 10 project submissions.",
    icon:        "🔟",
    check:       ({ totalSubmissions }) => totalSubmissions >= 10,
  },
  {
    id:          "fifty_submissions",
    name:        "Grinder",
    description: "Completed 50 project submissions.",
    icon:        "💯",
    check:       ({ totalSubmissions }) => totalSubmissions >= 50,
  },

  // ── Score milestones ──────────────────────────────────────────────────────
  {
    id:          "first_perfect",
    name:        "Perfectionist",
    description: "Scored 100 on a project.",
    icon:        "🌟",
    check:       ({ submissions }) => submissions.some((s) => s.score === 100),
  },
  {
    id:          "high_scorer",
    name:        "High Achiever",
    description: "Scored 80+ on 5 different projects.",
    icon:        "🏆",
    check:       ({ submissions }) =>
      submissions.filter((s) => s.score >= 80).length >= 5,
  },
  {
    id:          "above_average",
    name:        "Above Average",
    description: "Your overall SkillScore is above 60.",
    icon:        "📈",
    check:       ({ overallScore }) => overallScore >= 60,
  },

  // ── Skill dimension badges ────────────────────────────────────────────────
  {
    id:          "debug_master",
    name:        "Bug Slayer",
    description: "Debugging score reached 80+.",
    icon:        "🐛",
    check:       ({ skillScore }) => (skillScore?.scores?.debugging?.score || 0) >= 80,
  },
  {
    id:          "code_quality_pro",
    name:        "Clean Coder",
    description: "Code Quality score reached 80+.",
    icon:        "✨",
    check:       ({ skillScore }) => (skillScore?.scores?.codeQuality?.score || 0) >= 80,
  },
  {
    id:          "speed_demon",
    name:        "Speed Demon",
    description: "Time Management score reached 80+.",
    icon:        "⚡",
    check:       ({ skillScore }) => (skillScore?.scores?.timeManagement?.score || 0) >= 80,
  },
  {
    id:          "concept_wizard",
    name:        "Concept Wizard",
    description: "Concept Application score reached 80+.",
    icon:        "🧙",
    check:       ({ skillScore }) => (skillScore?.scores?.conceptApplication?.score || 0) >= 80,
  },

  // ── Streak badges ─────────────────────────────────────────────────────────
  {
    id:          "streak_3",
    name:        "On a Roll",
    description: "Maintained a 3-day coding streak.",
    icon:        "🔥",
    check:       ({ streak }) => (streak?.current || 0) >= 3,
  },
  {
    id:          "streak_7",
    name:        "Week Warrior",
    description: "Maintained a 7-day coding streak.",
    icon:        "🗓️",
    check:       ({ streak }) => (streak?.longest || 0) >= 7,
  },
  {
    id:          "streak_30",
    name:        "Unstoppable",
    description: "Maintained a 30-day coding streak.",
    icon:        "🏅",
    check:       ({ streak }) => (streak?.longest || 0) >= 30,
  },

  // ── Language diversity ────────────────────────────────────────────────────
  {
    id:          "polyglot",
    name:        "Polyglot",
    description: "Submitted code in 3+ different languages.",
    icon:        "🌍",
    check:       ({ submissions }) => {
      const langs = new Set(submissions.map((s) => s.language));
      return langs.size >= 3;
    },
  },

  // ── Tier badges ───────────────────────────────────────────────────────────
  {
    id:          "tier_gold",
    name:        "Gold Tier",
    description: "Reached Gold tier on the leaderboard.",
    icon:        "🥇",
    check:       ({ skillScore }) =>
      ["gold", "platinum", "diamond"].includes(skillScore?.tier),
  },
  {
    id:          "tier_diamond",
    name:        "Diamond Elite",
    description: "Reached Diamond tier — the highest rank.",
    icon:        "💎",
    check:       ({ skillScore }) => skillScore?.tier === "diamond",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Controllers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @desc  Get the logged-in user's SkillScore formatted for a radar chart
 * @route GET /api/analytics/skillscore
 * @access Private
 */
const getSkillScore = async (req, res) => {
  try {
    const skillScore = await SkillScore.findOrCreate(req.user._id);

    const dimensions = [
      "debugging",
      "problemSolving",
      "codeQuality",
      "timeManagement",
      "conceptApplication",
    ];

    // Format for Chart.js / Recharts radar chart
    const radarData = dimensions.map((dim) => ({
      dimension:      formatDimensionLabel(dim),
      key:            dim,
      score:          skillScore.scores[dim]?.score          ?? 0,
      submissions:    skillScore.scores[dim]?.submissionCount ?? 0,
      trend:          skillScore.scores[dim]?.trend           ?? "new",
      lastUpdated:    skillScore.scores[dim]?.lastUpdated     ?? null,
    }));

    return res.status(200).json({
      success: true,
      data: {
        radarData,
        overallScore:     skillScore.overallScore,
        tier:             skillScore.tier,
        globalRank:       skillScore.globalRank,
        collegeRank:      skillScore.collegeRank,
        totalSubmissions: skillScore.totalSubmissions,
        lastRecalculated: skillScore.lastRecalculated,
      },
    });
  } catch (err) {
    console.error("getSkillScore error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * @desc  Return submission history with scores over time (for line chart)
 * @route GET /api/analytics/progress
 * @access Private
 * @query ?limit=30   how many past submissions to return (default 30, max 100)
 * @query ?projectId  filter to a specific project
 */
const getProgress = async (req, res) => {
  try {
    const limit     = Math.min(parseInt(req.query.limit) || 30, 100);
    const filter    = { userId: req.user._id, status: "completed" };
    if (req.query.projectId) filter.projectId = req.query.projectId;

    const submissions = await Submission.find(filter)
      .populate("projectId", "title category difficulty tags")
      .sort({ createdAt: 1 }) // oldest → newest for a timeline
      .limit(limit)
      .select("score language status attemptNumber timeTakenMinutes aiReview createdAt projectId");

    // Build timeline series
    const timeline = submissions.map((s) => ({
      date:           s.createdAt,
      score:          s.score,
      language:       s.language,
      projectTitle:   s.projectId?.title  || "Unknown",
      category:       s.projectId?.category || "other",
      difficulty:     s.projectId?.difficulty || "beginner",
      attemptNumber:  s.attemptNumber,
      timeTaken:      s.timeTakenMinutes,
      aiScore:        s.aiReview?.codeQualityScore ?? null,
    }));

    // Per-category averages
    const categoryMap = {};
    for (const s of submissions) {
      const cat = s.projectId?.category || "other";
      if (!categoryMap[cat]) categoryMap[cat] = { total: 0, count: 0 };
      categoryMap[cat].total += s.score;
      categoryMap[cat].count += 1;
    }
    const categoryAverages = Object.entries(categoryMap).map(([cat, v]) => ({
      category: cat,
      average:  Math.round(v.total / v.count),
      count:    v.count,
    }));

    // Running average across all submissions
    let runningTotal = 0;
    const timelineWithAvg = timeline.map((point, i) => {
      runningTotal += point.score;
      return { ...point, runningAverage: Math.round(runningTotal / (i + 1)) };
    });

    return res.status(200).json({
      success: true,
      data: {
        timeline:          timelineWithAvg,
        categoryAverages,
        totalCompleted:    timeline.length,
        latestScore:       timeline.at(-1)?.score ?? null,
        bestScore:         timeline.length ? Math.max(...timeline.map((t) => t.score)) : null,
        averageScore:      timeline.length
          ? Math.round(timeline.reduce((s, t) => s + t.score, 0) / timeline.length)
          : null,
      },
    });
  } catch (err) {
    console.error("getProgress error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * @desc  Calculate and return earned badges based on submissions and skill scores
 * @route GET /api/analytics/badges
 * @access Private
 */
const getBadges = async (req, res) => {
  try {
    const [user, skillScore, submissions] = await Promise.all([
      User.findById(req.user._id).select("streak badges"),
      SkillScore.findOrCreate(req.user._id),
      Submission.find({ userId: req.user._id, status: "completed" }).select(
        "score language projectId createdAt"
      ),
    ]);

    const context = {
      totalSubmissions: submissions.length,
      submissions,
      overallScore:     skillScore.overallScore,
      skillScore,
      streak:           user.streak,
    };

    // Evaluate all badge definitions
    const existingIds = new Set((user.badges || []).map((b) => b.name));
    const earned      = [];
    const newlyEarned = [];

    for (const def of BADGE_DEFINITIONS) {
      const qualifies = def.check(context);
      if (qualifies) {
        earned.push({
          id:          def.id,
          name:        def.name,
          description: def.description,
          icon:        def.icon,
          isNew:       !existingIds.has(def.name),
        });

        // Award new badges to the User document
        if (!existingIds.has(def.name)) {
          newlyEarned.push({ name: def.name, description: def.description, icon: def.icon });
        }
      }
    }

    // Persist newly earned badges
    if (newlyEarned.length > 0) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: { badges: { $each: newlyEarned } },
      });
    }

    // Badges not yet earned (for progress UI)
    const earnedIds  = new Set(earned.map((b) => b.id));
    const locked     = BADGE_DEFINITIONS
      .filter((def) => !earnedIds.has(def.id))
      .map((def) => ({
        id:          def.id,
        name:        def.name,
        description: def.description,
        icon:        def.icon,
      }));

    return res.status(200).json({
      success: true,
      data: {
        earned,
        locked,
        newlyEarned:   newlyEarned.length,
        totalEarned:   earned.length,
        totalBadges:   BADGE_DEFINITIONS.length,
        completionPct: Math.round((earned.length / BADGE_DEFINITIONS.length) * 100),
      },
    });
  } catch (err) {
    console.error("getBadges error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * @desc  Return current coding streak + last-30-days activity heatmap
 * @route GET /api/analytics/streak
 * @access Private
 */
const getStreak = async (req, res) => {
  try {
    const [user, submissions] = await Promise.all([
      User.findById(req.user._id).select("streak"),
      Submission.find({ userId: req.user._id })
        .select("createdAt status")
        .sort({ createdAt: -1 })
        .limit(200), // enough to cover 30 days of heavy use
    ]);

    const streak = user.streak || { current: 0, longest: 0, lastActiveDate: null };

    // Build a set of active days (YYYY-MM-DD) from submissions
    const activeDays = new Set(
      submissions.map((s) => toDateString(s.createdAt))
    );

    // Generate last-60-days calendar data
    const heatmap = [];
    const today   = new Date();
    for (let i = 59; i >= 0; i--) {
      const d   = new Date(today);
      d.setDate(d.getDate() - i);
      const key = toDateString(d);
      heatmap.push({
        date:   key,
        active: activeDays.has(key),
        count:  submissions.filter((s) => toDateString(s.createdAt) === key).length,
      });
    }

    // Recalculate actual current streak from submission history
    // (source of truth vs the stored value which updates only on login)
    const recalculated = calcCurrentStreak(activeDays);

    return res.status(200).json({
      success: true,
      data: {
        current:         recalculated.current,
        longest:         Math.max(streak.longest, recalculated.longest),
        lastActiveDate:  streak.lastActiveDate,
        heatmap,                              // 60-day activity calendar
        activeDaysTotal: activeDays.size,
        message:         streakMessage(recalculated.current),
      },
    });
  } catch (err) {
    console.error("getStreak error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toDateString(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function calcCurrentStreak(activeDaysSet) {
  let current = 0;
  let longest = 0;
  let temp    = 0;
  const today = new Date();

  // Walk backwards from today
  for (let i = 0; i < 365; i++) {
    const d   = new Date(today);
    d.setDate(d.getDate() - i);
    const key = toDateString(d);

    if (activeDaysSet.has(key)) {
      temp++;
      if (i === 0 || current > 0) current = temp; // only count if streak reaches today
      longest = Math.max(longest, temp);
    } else {
      if (i === 0) {
        // No activity today — check yesterday before resetting
        current = 0;
      } else {
        temp = 0;
      }
    }
  }

  return { current, longest };
}

function formatDimensionLabel(key) {
  const labels = {
    debugging:          "Debugging",
    problemSolving:     "Problem Solving",
    codeQuality:        "Code Quality",
    timeManagement:     "Time Management",
    conceptApplication: "Concept Application",
  };
  return labels[key] || key;
}

function streakMessage(current) {
  if (current === 0)  return "Start coding today to begin your streak!";
  if (current === 1)  return "Great start! Come back tomorrow to build your streak.";
  if (current < 7)   return `${current} days strong — keep it up!`;
  if (current < 30)  return `${current} days 🔥 — you're on fire!`;
  return `${current} days 🏅 — absolutely unstoppable!`;
}

/**
 * @desc    Get top 50 users ranked by XP + current user's rank
 */
const getLeaderboard = async (req, res) => {
  try {
    const filter = req.query.filter || 'all'; // Currently just fetching all-time XP for simplicity
    
    // Fetch users sorted by XP in descending order
    // In a production app with huge userbases, this should be optimized
    const users = await User.find()
      .select('_id name college xp badges')
      .sort({ xp: -1 })
      .lean();

    // Calculate additional stats (projects completed, avgScore)
    // For a hackathon, we can either aggregate this live or use mocked/cached values.
    // To make it robust without killing the DB, let's aggregate for the top 50 only.
    const topUsers = users.slice(0, 50);
    
    const enrichedLeaderboard = await Promise.all(topUsers.map(async (u, index) => {
      // Get user's skill score for avgScore
      const skillScore = await SkillScore.findOne({ userId: u._id }).lean();
      let avgScore = 0;
      if (skillScore) {
         avgScore = skillScore.overallScore || 0;
      }
      
      // Get number of completed projects
      const submissions = await Submission.countDocuments({ userId: u._id, status: 'completed' });

      return {
        _id: u._id,
        rank: index + 1,
        name: u.name || "Anonymous Engineer",
        college: u.college || "Independent",
        xp: u.xp || 0,
        projectsCompleted: submissions,
        avgScore: parseFloat(avgScore.toFixed(1)),
        isMe: req.user._id.toString() === u._id.toString()
      };
    }));

    // Find current user's rank if not in top 50
    let myRank = null;
    const myIndex = users.findIndex(u => u._id.toString() === req.user._id.toString());
    if (myIndex !== -1) {
      myRank = myIndex + 1;
    }

    res.status(200).json({
      leaderboard: enrichedLeaderboard,
      myRank
    });

  } catch (error) {
    console.error("getLeaderboard error:", error);
    res.status(500).json({ message: "Server error retrieving leaderboard" });
  }
};

module.exports = { getSkillScore, getProgress, getBadges, getStreak, getLeaderboard };
