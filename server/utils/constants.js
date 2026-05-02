// Server-side constants to avoid magic numbers

module.exports = {
  // Pagination
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE_SIZE: 20,

  // Model limits
  MAX_SKILLS: 50,
  MAX_TAGS: 20,
  MAX_TASKS: 50,
  MAX_CODE_LENGTH: 200000,
  MAX_BIO_LENGTH: 500,
  MAX_PROJECT_TITLE: 150,
  MAX_PROJECT_DESC: 5000,

  // AI Review
  MAX_AI_RETRIES: 3,
  AI_TIMEOUT_MS: 30000,

  // Rate limiting
  GENERAL_RATE_LIMIT: 100, // requests per 15min
  AUTH_RATE_LIMIT: 5, // auth attempts per 15min

  // JWT
  JWT_EXPIRES_IN: "7d",

  // Skill dimensions
  SKILL_DIMENSIONS: [
    "debugging",
    "problemSolving",
    "codeQuality",
    "timeManagement",
    "conceptApplication",
  ],
  SKILL_WEIGHTS: {
    debugging: 0.2,
    problemSolving: 0.25,
    codeQuality: 0.2,
    timeManagement: 0.15,
    conceptApplication: 0.2,
  },

  // Tier breakpoints
  TIER_BREAKPOINTS: {
    diamond: 90,
    platinum: 75,
    gold: 55,
    silver: 35,
    bronze: 0,
  },
};
