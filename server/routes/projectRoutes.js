const express = require("express");
const { body, param } = require("express-validator");
const { listProjects, getProject, createProject } = require("../controllers/projectController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect); // all project routes require login

const createProjectRules = [
  body("title").trim().notEmpty().withMessage("Title is required.").isLength({ max: 150 }),
  body("description").trim().notEmpty().withMessage("Description is required.").isLength({ min: 10 }),
  body("difficulty").isIn(["beginner", "intermediate", "advanced", "expert"]).withMessage("Invalid difficulty."),
  body("category").notEmpty().withMessage("Category is required."),
];

/** GET /api/projects        — list published projects */
router.get("/", listProjects);

/** GET /api/projects/:id    — get single project */
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project ID."),
  getProject
);

/** POST /api/projects       — create (instructor/admin only) */
router.post(
  "/",
  restrictTo("instructor", "admin"),
  createProjectRules,
  createProject
);

module.exports = router;
