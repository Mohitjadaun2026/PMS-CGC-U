const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    console.log('Fetching all jobs...'); // Debug log
    const jobs = await Job.find();
    console.log(`Found ${jobs.length} jobs`); // Debug log
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs', details: err.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    console.log('📝 Creating new job...');
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file ? req.file.filename : 'No file uploaded');
    
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
    
    // Handle file upload - local storage only
    if (req.file) {
      jobData.companyLogo = `/uploads/${req.file.filename}`;
      console.log('✅ Logo uploaded locally:', jobData.companyLogo);
    } else {
      console.log('ℹ️ No logo uploaded for this job');
    }
    
    console.log('Processed job data:', jobData);
    
    const job = new Job(jobData);
    await job.save();
    console.log('✅ Job created successfully:', job._id);
    res.status(201).json(job);
  } catch (err) {
    console.error('❌ Error creating job:', err);
    res.status(500).json({ error: 'Failed to create job', details: err.message });
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
      console.log('✅ Logo updated locally:', jobData.companyLogo);
    }
    
    console.log('Processed update data:', jobData); // Debug log
    
    const job = await Job.findByIdAndUpdate(req.params.id, jobData, { new: true });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    console.log('Updated job:', job); // Debug log
    res.json(job);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Failed to update job', details: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    console.log('Deleting job:', req.params.id); // Debug log
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    console.log('Job deleted successfully'); // Debug log
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ error: 'Failed to delete job', details: err.message });
  }
};