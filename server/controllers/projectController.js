const mongoose = require("mongoose");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

/**
 * @desc    List all published projects (with optional filtering)
 * @route   GET /api/projects
 * @access  Private
 */
const listProjects = async (req, res) => {
  try {
    const { category, difficulty, search, limit = 20, page = 1 } = req.query;

    // Validate and sanitize pagination
    const parsedLimit = Math.min(Math.max(Number(limit) || 20, 1), 100); // 1-100
    const parsedPage = Math.max(Number(page) || 1, 1); // min 1

    const filter = { isPublished: true, isArchived: false };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (parsedPage - 1) * parsedLimit;
    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .select("-testCases -starterCode") // don't expose test answers in listing
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit);

    return res.status(200).json({
      success: true,
      data: {
        projects,
        total,
        page: parsedPage,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (err) {
    console.error("listProjects error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * @desc    Get a single project by ID (including starter code & tasks)
 * @route   GET /api/projects/:id
 * @access  Private
 */
const getProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    const project = await Project.findById(req.params.id).populate(
      "createdBy",
      "name avatar",
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }
    if (!project.isPublished && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "This project is not published yet.",
        });
    }

    // Convert the starterCode Map to a plain object for JSON serialisation
    const starterCodeObj = {};
    if (project.starterCode) {
      project.starterCode.forEach((v, k) => {
        starterCodeObj[k] = v;
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        ...project.toObject({ virtuals: true }),
        starterCode: starterCodeObj,
      },
    });
  } catch (err) {
    console.error("getProject error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private (instructor or admin)
 */
const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user._id,
    });
    return res.status(201).json({ success: true, data: project });
  } catch (err) {
    console.error("createProject error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { listProjects, getProject, createProject };
