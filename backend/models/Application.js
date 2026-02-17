const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
	fieldId: String,  // Reference to the field in job's applicationFormFields
	fieldLabel: String,
	response: mongoose.Schema.Types.Mixed,
	fieldType: String
}, { _id: false });

const applicationSchema = new mongoose.Schema({
	job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Student who applied
	applicantName: { type: String, required: true },
	applicantEmail: { type: String, required: true },
	applicantPhone: { type: String },
	applicantCourse: { type: String },
	applicantYear: { type: String },
	applicantBranch: { type: String },
	resumePath: { type: String },  // Path to uploaded resume
	resumeFileName: { type: String },  // Original resume filename
	status: { 
		type: String, 
		enum: ['pending', 'shortlisted', 'interviewed', 'selected', 'rejected'], 
		default: 'pending' 
	},
	appliedAt: { type: Date, default: Date.now },
	formResponses: [formResponseSchema],
	adminNotes: { type: String },
	tenantId: { type: String },  // For multi-tenant support
	updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
