const Job = require("../models/Job");
const mongoose = require('mongoose');

// Helper: handle array fields for job data
const processArrayFields = (jobData, fields) => {
  fields.forEach((field) => {
    const formField = `${field}[]`;
    if (jobData[formField]) {
      jobData[field] = Array.isArray(jobData[formField])
        ? jobData[formField]
        : [jobData[formField]];
      delete jobData[formField];
    }
    if (!jobData[field]) jobData[field] = [];
  });
};

// GET all jobs
exports.getAllJobs = async (req, res) => {
  try {
    console.log("📊 Fetching all jobs...");
    const jobs = await Job.find();
    console.log(`✅ Found ${jobs.length} jobs`);
    
    // Log details about applicationFormFields for each job
    jobs.forEach((job, index) => {
      console.log(`  Job ${index + 1}: "${job.position}" (${job.jobApplicationType})`);
      console.log(`    - Has applicationFormFields: ${!!job.applicationFormFields}`);
      console.log(`    - Fields count: ${job.applicationFormFields?.length || 0}`);
      if (job.applicationFormFields && job.applicationFormFields.length > 0) {
        console.log(`    - Field names: ${job.applicationFormFields.map(f => f.fieldName).join(', ')}`);
      }
    });
    
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch jobs", details: err.message });
  }
};

// GET jobs by ID
exports.getJobsById = async (req, res) => {
  const id = req.params.id;
  const objectId = new mongoose.Types.ObjectId(id);
  console.log(objectId);
  try {
    console.log("📍 Fetching job by ID:", id);
    const job = await Job.findById(objectId);
    if (!job) {
      console.log("❌ Job not found");
      return res.status(404).json({ error: 'Job not found' });
    }
    
    console.log(`✅ Job found: "${job.position}"`);
    console.log(`  - Has applicationFormFields: ${!!job.applicationFormFields}`);
    console.log(`  - Fields count: ${job.applicationFormFields?.length || 0}`);
    if (job.applicationFormFields && job.applicationFormFields.length > 0) {
      console.log(`  - Field names: ${job.applicationFormFields.map(f => f.fieldName).join(', ')}`);
    }
    
    res.json(job);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch jobs", details: err.message });
  }
};

// CREATE a new job
exports.createJob = async (req, res) => {
  try {
    console.log("📝 Creating new job...");
    console.log("Request body:", req.body);
    console.log(
      "Uploaded file:",
      req.file ? req.file.filename : "No file uploaded"
    );

    const jobData = { ...req.body };
    
    // Process array fields
    processArrayFields(jobData, [
      "eligibleCourses",
      "eligibleBranches",
      "eligibleYears",
    ]);

    // Parse applicationFormFields if it's a JSON string
    console.log("📋 Processing applicationFormFields:");
    console.log("  Raw value:", jobData.applicationFormFields);
    console.log("  Type:", typeof jobData.applicationFormFields);
    
    if (jobData.applicationFormFields && typeof jobData.applicationFormFields === 'string') {
      try {
        jobData.applicationFormFields = JSON.parse(jobData.applicationFormFields);
        console.log("  ✅ Parsed successfully. Count:", jobData.applicationFormFields.length);
        console.log("  Fields:", jobData.applicationFormFields);
      } catch (e) {
        console.warn("  ❌ Failed to parse applicationFormFields:", e.message);
        jobData.applicationFormFields = [];
      }
    } else if (Array.isArray(jobData.applicationFormFields)) {
      console.log("  ✅ Already an array. Count:", jobData.applicationFormFields.length);
    } else {
      console.log("  ℹ️ No applicationFormFields provided");
      jobData.applicationFormFields = [];
    }

    if (req.file) {
      jobData.companyLogo = `/uploads/${req.file.filename}`;
      console.log("✅ Logo uploaded locally:", jobData.companyLogo);
    } else {
      delete jobData.companyLogo;
      console.log("ℹ️ No logo uploaded for this job");
    }

    console.log("Processed job data:", jobData);
    const job = new Job(jobData);
    await job.save();
    console.log("✅ Job created successfully:", job._id);
    res.status(201).json(job);
  } catch (err) {
    console.error("❌ Error creating job:", err);
    res
      .status(500)
      .json({ error: "Failed to create job", details: err.message });
  }
};

// UPDATE an existing job
exports.updateJob = async (req, res) => {
  try {
    console.log("=== UPDATE JOB REQUEST ===");
    console.log("Request body:", req.body);
    console.log(
      "Uploaded file:",
      req.file ? req.file.filename : "No file uploaded"
    );

    const jobData = { ...req.body };
    
    // Process array fields
    processArrayFields(jobData, [
      "eligibleCourses",
      "eligibleBranches",
      "eligibleYears",
    ]);

    // Parse applicationFormFields if it's a JSON string
    console.log("📋 Processing applicationFormFields for update:");
    console.log("  Raw value:", jobData.applicationFormFields);
    console.log("  Type:", typeof jobData.applicationFormFields);
    
    if (jobData.applicationFormFields && typeof jobData.applicationFormFields === 'string') {
      try {
        jobData.applicationFormFields = JSON.parse(jobData.applicationFormFields);
        console.log("  ✅ Parsed successfully. Count:", jobData.applicationFormFields.length);
        console.log("  Fields:", jobData.applicationFormFields);
      } catch (e) {
        console.warn("  ❌ Failed to parse applicationFormFields:", e.message);
        jobData.applicationFormFields = [];
      }
    } else if (Array.isArray(jobData.applicationFormFields)) {
      console.log("  ✅ Already an array. Count:", jobData.applicationFormFields.length);
    } else {
      console.log("  ℹ️ No applicationFormFields provided, keeping existing ones");
    }

    if (req.file) {
      jobData.companyLogo = `/uploads/${req.file.filename}`;
      console.log("✅ Logo updated locally:", jobData.companyLogo);
    } else {
      delete jobData.companyLogo;
      console.log("ℹ️ No new logo uploaded, preserving existing logo");
    }

    console.log("Processed update data:", jobData);
    const job = await Job.findByIdAndUpdate(req.params.id, jobData, {
      new: true,
    });
    if (!job) return res.status(404).json({ error: "Job not found" });

    console.log("Updated job:", job);
    res.json(job);
  } catch (err) {
    console.error("Error updating job:", err);
    res
      .status(500)
      .json({ error: "Failed to update job", details: err.message });
  }
};

// DELETE a job
exports.deleteJob = async (req, res) => {
  try {
    console.log("Deleting job:", req.params.id);
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    console.log("Job deleted successfully");
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res
      .status(500)
      .json({ error: "Failed to delete job", details: err.message });
  }
};
