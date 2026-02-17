const mongoose = require('mongoose');

// Schema for dynamic form fields
const formFieldSchema = new mongoose.Schema({
  fieldId: String,  // Unique identifier for the field (uuid)
  fieldName: String,  // Label name
  fieldType: {
    type: String,
    enum: ['text', 'email', 'phone', 'number', 'textarea', 'select', 'checkbox', 'radio', 'date', 'file'],
    default: 'text'
  },
  isRequired: { type: Boolean, default: false },
  isPredefined: { type: Boolean, default: false },  // true for standard fields like Name, Email, Phone
  placeholder: String,
  helpText: String,
  options: [String],  // For select, radio, checkbox types
  order: Number  // To maintain field order
}, { _id: false });

const jobSchema = new mongoose.Schema({
  companyName: String,
  companyLogo: String,
  companyWebsite: String,
  position: String,
  jobType: String,  // Internship, Full-time, etc.
  jobApplicationType: {
    type: String,
    enum: ['on-campus', 'off-campus'],
    default: 'on-campus'
  },
  externalApplicationLink: String,  // For off-campus jobs
  salaryPackage: String,
  location: String,
  applicationDeadline: String,
  jobDescription: String,
  skillsRequired: String,
  selectionProcess: String,
  bondDetails: String,
  benefits: String,
  contactPerson: String,
  contactEmail: String,
  contactPhone: String,
  driveDate: String,
  additionalInfo: String,
  eligibleCourses: [String],
  eligibleYears: [String],
  eligibleBranches: [String],
  
  // Dynamic form fields for on-campus applications
  applicationFormFields: [formFieldSchema],
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);