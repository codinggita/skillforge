const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const User = require("./models/User");
const Project = require("./models/Project");
const SkillScore = require("./models/SkillScore");
const Submission = require("./models/Submission");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/skillforge");
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Project.deleteMany({});
    await SkillScore.deleteMany({});
    await Submission.deleteMany({});
    console.log("Cleared existing data.");

    // Create test user first so we can attach createdBy
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Password123!", salt);

    const testUser = await User.create({
      name: "Test User",
      email: "test@test.com",
      password: hashedPassword,
      college: "Test University",
      role: "admin"
    });
    console.log("Created test user: test@test.com / Password123!");

    const MOCK_PROJECTS = [
      {
        title: "Array Reversal",
        description: "Reverse an array in-place without extra memory. Classic interview warm-up.",
        difficulty: "beginner",
        category: "data-structures",
        tags: ["Arrays", "Two Pointer"],
        timeLimit: 30,
        createdBy: testUser._id,
        isPublished: true,
        starterCode: { javascript: "function reverseArray(arr) {\n  // Your code here\n}\n" },
      },
      {
        title: "Auth Middleware",
        description: "Build JWT authentication middleware for an Express API with refresh token rotation.",
        difficulty: "intermediate",
        category: "web-development",
        tags: ["JWT", "Express", "Security"],
        timeLimit: 45,
        createdBy: testUser._id,
        isPublished: true,
        starterCode: { javascript: "const jwt = require('jsonwebtoken');\n\nfunction authMiddleware(req, res, next) {\n  // Implement auth check\n}\n" },
      },
      {
        title: "LRU Cache",
        description: "Implement an O(1) LRU cache using doubly linked list and hash map.",
        difficulty: "advanced",
        category: "system-design",
        tags: ["Linked List", "HashMap", "Design"],
        timeLimit: 60,
        createdBy: testUser._id,
        isPublished: true,
        starterCode: { javascript: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n  }\n\n  get(key) {\n    return -1;\n  }\n\n  put(key, value) {\n  }\n}\n" },
      }
    ];

    // Create projects
    const createdProjects = await Project.insertMany(MOCK_PROJECTS);
    console.log(`Created ${createdProjects.length} projects.`);

    // Create SkillScore for test user
    const skillScore = await SkillScore.create({
      userId: testUser._id,
      scores: {
        debugging: { score: 80, submissionCount: 1, totalPoints: 80 },
        problemSolving: { score: 75, submissionCount: 1, totalPoints: 75 },
        codeQuality: { score: 85, submissionCount: 1, totalPoints: 85 },
        timeManagement: { score: 60, submissionCount: 1, totalPoints: 60 },
        conceptApplication: { score: 90, submissionCount: 1, totalPoints: 90 }
      },
      overallScore: 78,
      tier: "gold",
      totalSubmissions: 5
    });
    console.log("Created SkillScore for test user.");

    // Update user XP
    await User.findByIdAndUpdate(testUser._id, { xp: 2450 });
    console.log("Updated test user XP.");

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
