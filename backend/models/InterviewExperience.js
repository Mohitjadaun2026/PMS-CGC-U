const mongoose = require('mongoose');

const interviewExperienceSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String},
  contact: { type: String },
  branch: { type: String },
  graduationYear: { type: String, },
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  ctc: { type: Number },
  stipend: { type: Number },
  interviewDate: { type: String },
  experience: { type: String, required: true },
  rating: { type: Number, default: 0 },
  tags: [{ type: String }],
  customTag: { type: String },
  rounds: [{ 
    roundName: String, 
    description: String 
  }],
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('InterviewExperience', interviewExperienceSchema);
