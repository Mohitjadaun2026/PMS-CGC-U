const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
	fieldLabel: String,
	response: mongoose.Schema.Types.Mixed,
	fieldType: String
}, { _id: false });

const applicationSchema = new mongoose.Schema({
	job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
	applicantName: { type: String, required: true },
	applicantEmail: { type: String, required: true },
	applicantPhone: { type: String },
	applicantCourse: { type: String },
	applicantYear: { type: String },
	applicantBranch: { type: String },
	status: { type: String, enum: ['pending', 'shortlisted', 'interviewed', 'selected', 'rejected'], default: 'pending' },
	appliedAt: { type: Date, default: Date.now },
	formResponses: [formResponseSchema],
	adminNotes: { type: String }
});

module.exports = mongoose.model('Application', applicationSchema);
