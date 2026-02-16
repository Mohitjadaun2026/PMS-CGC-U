const Application = require("../models/Application");
const Job = require("../models/Job");

// ========================
// Helpers
// ========================
const sendError = (res, status, message) =>
  res.status(status).json({ error: message });

// ========================
// Controllers
// ========================

// Submit a job application
exports.submitApplication = async (req, res) => {
  try {
    const { jobId, applicantData, formResponses } = req.body;

    // Validate job
    const job = await Job.findById(jobId);
    if (!job) return sendError(res, 404, "Job not found");

    if (job.campusType !== "on-campus") {
      return sendError(
        res,
        400,
        "This job does not accept applications through this system"
      );
    }

    // Prevent duplicate applications
    const existingApplication = await Application.findOne({
      jobId,
      applicantEmail: applicantData.applicantEmail,
    });

    if (existingApplication) {
      return sendError(res, 400, "You have already applied for this job");
    }

    // Create application
    const application = new Application({
      jobId,
      ...applicantData,
      formResponses,
    });

    await application.save();

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error("Error submitting application:", err);
    return sendError(res, 500, err.message);
  }
};

// Get all applications for a specific job (admin only)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
      .populate("jobId", "position companyName")
      .sort({ appliedAt: -1 });

    return res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    return sendError(res, 500, err.message);
  }
};

// Get all applications across all jobs (admin only)
exports.getAllApplications = async (_req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "position companyName campusType")
      .sort({ appliedAt: -1 });

    return res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    return sendError(res, 500, err.message);
  }
};

// Update application status (admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, adminNotes } = req.body;

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status, adminNotes },
      { new: true }
    ).populate("jobId", "position companyName");

    if (!application) return sendError(res, 404, "Application not found");

    return res.json(application);
  } catch (err) {
    console.error("Error updating application:", err);
    return sendError(res, 500, err.message);
  }
};

// Get application statistics (admin only)
exports.getApplicationStats = async (_req, res) => {
  try {
    const stats = await Application.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const totalApplications = await Application.countDocuments();

    return res.json({
      totalApplications,
      statusBreakdown: stats,
    });
  } catch (err) {
    console.error("Error fetching application stats:", err);
    return sendError(res, 500, err.message);
  }
};
