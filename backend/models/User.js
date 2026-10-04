const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, trim: true, default: '' },
    rollNo: { type: String, trim: true, default: '' },
    department: { type: String, trim: true, default: '' },
    batch: { type: String, trim: true, default: '' },
    semester: { type: String, trim: true, default: '' },
    cgpa: { type: Number, min: 0, max: 10, default: null },
    backlogs: { type: Number, min: 0, default: 0 },
    skills: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
    projects: { type: [{ name: String, tech: String, status: String }], default: [] },
    achievements: { type: [String], default: [] },
    linkedin: { type: String, trim: true, default: '' },
    github: { type: String, trim: true, default: '' },
    resumePath: { type: String, default: '' },
    resumeFileName: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin', 'super_admin'], default: 'user' },
    isSuperAdmin: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lastPasswordChange: { type: Date, default: Date.now },
    forcePasswordChange: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date },
    isActive: { type: Boolean, default: true },
    interviewExperiences: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewExperience' }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


