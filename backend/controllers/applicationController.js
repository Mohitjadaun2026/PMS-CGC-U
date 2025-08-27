const Application = require('../models/Application');
const Job = require('../models/Job');
<<<<<<< HEAD
const User = require('../models/User');

// Submit application
exports.submitApplication = async (req, res) => {
  try {
    const { jobId, formResponses } = req.body;
    const studentId = req.user._id;
    const application = new Application({
      job: jobId,
      student: studentId,
      formResponses,
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get applications for a job (admin)
exports.getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId }).populate('student');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update application status (admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, notes } = req.body;
    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ error: 'Application not found.' });
    application.status = status;
    application.notes = notes || application.notes;
    await application.save();
    res.json({ message: 'Application status updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get applications for a student
exports.getApplicationsByStudent = async (req, res) => {
  try {
    const studentId = req.user._id;
    const applications = await Application.find({ student: studentId }).populate('job');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
=======

// Submit a job application
exports.submitApplication = async (req, res) => {
  try {
    const { jobId, applicantData, formResponses } = req.body;
    
    // Check if job exists and is on-campus
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    if (job.campusType !== 'on-campus') {
      return res.status(400).json({ error: 'This job does not accept applications through this system' });
    }
    
    // Check if applicant already applied for this job
    const existingApplication = await Application.findOne({
      jobId,
      applicantEmail: applicantData.applicantEmail
    });
    
    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }
    
    // Create new application
    const application = new Application({
      jobId,
      applicantName: applicantData.applicantName,
      applicantEmail: applicantData.applicantEmail,
      applicantPhone: applicantData.applicantPhone,
      applicantCourse: applicantData.applicantCourse,
      applicantYear: applicantData.applicantYear,
      applicantBranch: applicantData.applicantBranch,
      formResponses
    });
    
    await application.save();
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all applications for a specific job (admin only)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const applications = await Application.find({ jobId })
      .populate('jobId', 'position companyName')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all applications across all jobs (admin only)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('jobId', 'position companyName campusType')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: err.message });
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
    ).populate('jobId', 'position companyName');
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json(application);
  } catch (err) {
    console.error('Error updating application:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get application statistics (admin only)
exports.getApplicationStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const totalApplications = await Application.countDocuments();
    
    res.json({
      totalApplications,
      statusBreakdown: stats
    });
  } catch (err) {
    console.error('Error fetching application stats:', err);
    res.status(500).json({ error: err.message });
>>>>>>> origin/job-fetching-fix
  }
};
