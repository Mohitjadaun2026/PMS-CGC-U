const InterviewExperience = require("../models/InterviewExperience");
const User = require("../models/User");

// Helper for server errors
const handleServerError = (res, err) => {
  console.error(err);
  return res.status(500).json({ error: "Server error" });
};

// Get all interview experiences (with optional filters)
exports.getAllExperiences = async (req, res) => {
  try {
    const { company, role } = req.query;
    const filter = {};
    if (company) filter.company = new RegExp(company, "i");
    if (role) filter.role = new RegExp(role, "i");

    const experiences = await InterviewExperience.find(filter).sort({
      createdAt: -1,
    });
    res.json(experiences);
  } catch (err) {
    handleServerError(res, err);
  }
};

// Get a single experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const exp = await InterviewExperience.findById(req.params.id);
    if (!exp) return res.status(404).json({ error: "Not found" });
    res.json(exp);
  } catch (err) {
    handleServerError(res, err);
  }
};

// Add a new interview experience
exports.addExperience = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      branch,
      graduationYear,
      companyName,
      role,
      ctc,
      stipend,
      interviewDate,
      experience,
      rating,
      tags,
      customTag,
      rounds
    } = req.body;

    // Basic validation (adjust as needed)
    if (!companyName || !role || !experience) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    const newExp = new InterviewExperience({
      name,
      email,
      contact,
      branch,
      graduationYear,
      companyName,
      role,
      ctc,
      stipend,
      interviewDate,
      experience,
      rating,
      tags,
      customTag,
      rounds,
      createdBy: req.user.id
    });

    await newExp.save();

    // Add to user's profile
    await User.findByIdAndUpdate(req.user.id, {
      $push: { interviewExperiences: newExp._id },
    });

    res.status(201).json(newExp);
  } catch (err) {
    handleServerError(res, err);
  }
};

// Edit an existing interview experience
exports.editExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, experience } = req.body;
    if (![company, role, experience].every(Boolean)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedExp = await InterviewExperience.findByIdAndUpdate(
      id,
      { company, role, experience },
      { new: true, runValidators: true }
    );

    if (!updatedExp)
      return res.status(404).json({ error: "Experience not found" });

    res.status(200).json(updatedExp);
  } catch (err) {
    handleServerError(res, err);
  }
};

// Delete an interview experience
exports.deleteExperience = async (req, res) => {
  try {
    const experienceId = req.params.id;

    const experience = await InterviewExperience.findById(experienceId);
    if (!experience)
      return res.status(404).json({ error: "Interview experience not found" });

    if (experience.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await InterviewExperience.findByIdAndDelete(experienceId);
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { interviewExperiences: experienceId },
    });

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (err) {
    handleServerError(res, err);
  }
};
