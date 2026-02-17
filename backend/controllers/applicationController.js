const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

// ========================
// Helpers
// ========================
const sendError = (res, status, message) =>
  res.status(status).json({ error: message });

// ========================
// Controllers
// ========================

// Submit a job application with resume upload
exports.submitApplication = async (req, res) => {
  try {
    let { jobId, applicantData, formResponses, userId } = req.body;
    const resumeFile = req.file;

    console.log("\n🎯 ===== APPLICATION SUBMISSION START =====");
    console.log("📝 Submitting application...");
    console.log("Job ID:", jobId);
    
    // Log resume file details
    if (resumeFile) {
      console.log("✅ RESUME FILE RECEIVED:");
      console.log("   - Filename:", resumeFile.filename);
      console.log("   - Original name:", resumeFile.originalname);
      console.log("   - Mimetype:", resumeFile.mimetype);
      console.log("   - Size:", (resumeFile.size / 1024).toFixed(2), "KB");
      console.log("   - Path:", resumeFile.path);
    } else {
      console.log("❌ NO RESUME FILE in req.file");
    }

    // Parse JSON strings from FormData
    console.log("\nParsing form data...");
    if (typeof applicantData === 'string') {
      try {
        applicantData = JSON.parse(applicantData);
        console.log("✅ Parsed applicantData:", applicantData);
      } catch (e) {
        console.warn("❌ Failed to parse applicantData:", e.message);
      }
    }

    if (typeof formResponses === 'string') {
      try {
        formResponses = JSON.parse(formResponses);
        console.log("✅ Parsed formResponses - count:", formResponses.length);
      } catch (e) {
        console.warn("❌ Failed to parse formResponses:", e.message);
        formResponses = [];
      }
    }

    console.log("📋 Form data after parsing:");
    console.log("   - applicantData:", applicantData);
    console.log("   - formResponses count:", Array.isArray(formResponses) ? formResponses.length : 0);

    // Validate job exists
    const job = await Job.findById(jobId);
    if (!job) {
      // Clean up uploaded file if job validation fails
      if (resumeFile) {
        const fs = require('fs');
        const path = require('path');
        fs.unlink(path.join(__dirname, '..', 'uploads', resumeFile.filename), (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return sendError(res, 404, "Job not found");
    }

    // Check if job accepts applications (only on-campus jobs accept form submissions)
    if (job.jobApplicationType !== "on-campus") {
      if (resumeFile) {
        const fs = require('fs');
        const path = require('path');
        fs.unlink(path.join(__dirname, '..', 'uploads', resumeFile.filename), (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return sendError(
        res,
        400,
        "This job does not accept applications through this system. Please use the provided link."
      );
    }

    // Prevent duplicate applications
    const existingApplication = await Application.findOne({
      job: jobId,
      applicantEmail: applicantData.applicantEmail,
    });

    if (existingApplication) {
      if (resumeFile) {
        const fs = require('fs');
        const path = require('path');
        fs.unlink(path.join(__dirname, '..', 'uploads', resumeFile.filename), (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return sendError(res, 400, "You have already applied for this job");
    }

    // Get user details if userId is provided
    let userInfo = {};
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        userInfo = { userId: user._id };
      }
    }

    // Prepare application data
    const applicationData = {
      job: jobId,
      ...userInfo,
      applicantName: applicantData.applicantName || "",
      applicantEmail: applicantData.applicantEmail || "",
      applicantPhone: applicantData.applicantPhone || "",
      applicantCourse: applicantData.applicantCourse || "",
      applicantYear: applicantData.applicantYear || "",
      applicantBranch: applicantData.applicantBranch || "",
      formResponses: formResponses && Array.isArray(formResponses) ? formResponses : [],
      status: "pending",
    };

    // Add resume if uploaded
    if (resumeFile) {
      applicationData.resumePath = `/uploads/resumes/${resumeFile.filename}`;
      applicationData.resumeFileName = resumeFile.originalname;
      console.log("\n💾 ATTACHING RESUME TO APPLICATION:");
      console.log("   - resumePath:", applicationData.resumePath);
      console.log("   - resumeFileName:", applicationData.resumeFileName);
    } else {
      console.log("\n⚠️ NO RESUME TO ATTACH");
    }

    console.log("\n💾 Saving application to database...");
    console.log("Application data keys:", Object.keys(applicationData));
    
    // Create and save application
    const application = new Application(applicationData);
    await application.save();

    console.log("✅ Application created successfully:", application._id);
    console.log("Saved resume info:", {
      resumePath: application.resumePath,
      resumeFileName: application.resumeFileName
    });

    // Populate job details before returning
    await application.populate('job', 'position companyName');

    console.log("🎯 ===== APPLICATION SUBMISSION COMPLETE ===== \n");

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error("❌ Error submitting application:", err);
    
    // Clean up uploaded file if there's an error
    if (req.file) {
      const fs = require('fs');
      const path = require('path');
      fs.unlink(path.join(__dirname, '..', 'uploads', req.file.filename), (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    return sendError(res, 500, err.message);
  }
};

// Get all applications for a specific job (admin only)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("job", "position companyName jobApplicationType")
      .populate("userId", "name email phone")
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
      .populate("job", "position companyName jobApplicationType")
      .populate("userId", "name email phone")
      .sort({ appliedAt: -1 });

    return res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    return sendError(res, 500, err.message);
  }
};

// Get applications for logged-in student
exports.getStudentApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await Application.find({ userId })
      .populate("job", "position companyName salaryPackage jobApplicationType")
      .sort({ appliedAt: -1 });

    return res.json(applications);
  } catch (err) {
    console.error("Error fetching student applications:", err);
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
      { status, adminNotes, updatedAt: new Date() },
      { new: true }
    ).populate("job", "position companyName");

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

// Download resume
exports.downloadResume = async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    const application = await Application.findById(applicationId);
    if (!application || !application.resumePath) {
      return sendError(res, 404, "Resume not found");
    }

    const path = require('path');
    const fs = require('fs');
    const filePath = path.join(__dirname, '..', application.resumePath);

    if (!fs.existsSync(filePath)) {
      return sendError(res, 404, "Resume file not found");
    }

    res.download(filePath, application.resumeFileName || 'resume.pdf');
  } catch (err) {
    console.error("Error downloading resume:", err);
    return sendError(res, 500, err.message);
  }
};
