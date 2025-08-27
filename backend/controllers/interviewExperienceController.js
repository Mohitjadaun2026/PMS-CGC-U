const InterviewExperience = require('../models/InterviewExperience');

// Get all interview experiences (with optional filters)
exports.getAllExperiences = async (req, res) => {
  try {
    const { company, role } = req.query;
    let filter = {};
    if (company) filter.company = new RegExp(company, 'i');
    if (role) filter.role = new RegExp(role, 'i');
    const experiences = await InterviewExperience.find(filter).sort({ createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const exp = await InterviewExperience.findById(req.params.id);
    if (!exp) return res.status(404).json({ error: 'Not found' });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new interview experience
exports.addExperience = async (req, res) => {
  try {
    const { company, role, experience } = req.body;
    if (!company || !role || !experience) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newExp = new InterviewExperience({ company, role, experience });
    await newExp.save();
    res.status(201).json(newExp);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
