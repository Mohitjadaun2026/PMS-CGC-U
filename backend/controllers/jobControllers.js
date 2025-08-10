const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

exports.createJob = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    const jobData = { ...req.body };
    
    // Handle array fields that come as individual form fields (from FormData)
    if (jobData['eligibleCourses[]']) {
      jobData.eligibleCourses = Array.isArray(jobData['eligibleCourses[]']) 
        ? jobData['eligibleCourses[]'] 
        : [jobData['eligibleCourses[]']];
      delete jobData['eligibleCourses[]'];
    }
    
    if (jobData['eligibleBranches[]']) {
      jobData.eligibleBranches = Array.isArray(jobData['eligibleBranches[]']) 
        ? jobData['eligibleBranches[]'] 
        : [jobData['eligibleBranches[]']];
      delete jobData['eligibleBranches[]'];
    }
    
    if (jobData['eligibleYears[]']) {
      jobData.eligibleYears = Array.isArray(jobData['eligibleYears[]']) 
        ? jobData['eligibleYears[]'] 
        : [jobData['eligibleYears[]']];
      delete jobData['eligibleYears[]'];
    }
    
    // Ensure arrays exist even if empty
    if (!jobData.eligibleCourses) jobData.eligibleCourses = [];
    if (!jobData.eligibleBranches) jobData.eligibleBranches = [];
    if (!jobData.eligibleYears) jobData.eligibleYears = [];
    
    if (req.file) {
      jobData.companyLogo = `/uploads/${req.file.filename}`;
    }
    
    console.log('Processed job data:', jobData); // Debug log
    
    const job = new Job(jobData);
    await job.save();
    res.json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    console.log('Update request body:', req.body); // Debug log
    const jobData = { ...req.body };
    
    // Handle array fields that come as individual form fields
    if (jobData['eligibleCourses[]']) {
      jobData.eligibleCourses = Array.isArray(jobData['eligibleCourses[]']) 
        ? jobData['eligibleCourses[]'] 
        : [jobData['eligibleCourses[]']];
      delete jobData['eligibleCourses[]'];
    }
    
    if (jobData['eligibleBranches[]']) {
      jobData.eligibleBranches = Array.isArray(jobData['eligibleBranches[]']) 
        ? jobData['eligibleBranches[]'] 
        : [jobData['eligibleBranches[]']];
      delete jobData['eligibleBranches[]'];
    }
    
    if (jobData['eligibleYears[]']) {
      jobData.eligibleYears = Array.isArray(jobData['eligibleYears[]']) 
        ? jobData['eligibleYears[]'] 
        : [jobData['eligibleYears[]']];
      delete jobData['eligibleYears[]'];
    }
    
    // Ensure arrays exist even if empty
    if (!jobData.eligibleCourses) jobData.eligibleCourses = [];
    if (!jobData.eligibleBranches) jobData.eligibleBranches = [];
    if (!jobData.eligibleYears) jobData.eligibleYears = [];
    
    if (req.file) {
      jobData.companyLogo = `/uploads/${req.file.filename}`;
    }
    
    console.log('Processed update data:', jobData); // Debug log
    
    const job = await Job.findByIdAndUpdate(req.params.id, jobData, { new: true });
    console.log('Updated job:', job); // Debug log
    res.json(job);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};