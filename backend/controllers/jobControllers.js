const Job = require("../models/Job");
const mongoose = require('mongoose');

const JOB_TYPES = {
  ON_CAMPUS: 'ON_CAMPUS',
  OFF_CAMPUS: 'OFF_CAMPUS'
};

const normalizeJobType = (value) => {
  const normalized = String(value || '').trim().toUpperCase().replace(/-/g, '_');
  return normalized === JOB_TYPES.OFF_CAMPUS ? JOB_TYPES.OFF_CAMPUS : JOB_TYPES.ON_CAMPUS;
};

const getJobTypeFilter = (value) => {
  if (!value) return null;

  const normalized = String(value).trim().toUpperCase().replace(/-/g, '_');
  if (![JOB_TYPES.ON_CAMPUS, JOB_TYPES.OFF_CAMPUS].includes(normalized)) {
    return { error: 'type must be ON_CAMPUS or OFF_CAMPUS' };
  }

  if (normalized === JOB_TYPES.OFF_CAMPUS) {
    return { jobApplicationType: { $in: [JOB_TYPES.OFF_CAMPUS, 'off-campus'] } };
  }

  return {
    $or: [
      { jobApplicationType: { $in: [JOB_TYPES.ON_CAMPUS, 'on-campus'] } },
      { jobApplicationType: { $exists: false } },
      { jobApplicationType: null }
    ]
  };
};

const serializeJob = (job) => {
  const serialized = job.toObject ? job.toObject() : { ...job };
  serialized.jobApplicationType = normalizeJobType(serialized.jobApplicationType);
  return serialized;
};

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
    const typeFilter = getJobTypeFilter(req.query.type);
    if (typeFilter?.error) {
      return res.status(400).json({ error: typeFilter.error });
    }

    const jobs = await Job.find(typeFilter || {}).sort({ createdAt: -1 });
    res.json(jobs.map(serializeJob));
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch jobs", details: err.message });
  }
};

// GET jobs by ID
exports.getJobsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid job ID' });
    }

    const typeFilter = getJobTypeFilter(req.query.type);
    if (typeFilter?.error) {
      return res.status(400).json({ error: typeFilter.error });
    }

    const job = await Job.findOne({ _id: id, ...(typeFilter || {}) });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(serializeJob(job));
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

    const jobData = { ...req.body, jobApplicationType: normalizeJobType(req.body.jobApplicationType) };
    
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

    const job = new Job(jobData);
    await job.save();
    res.status(201).json(serializeJob(job));
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
    if (Object.prototype.hasOwnProperty.call(jobData, 'jobApplicationType')) {
      jobData.jobApplicationType = normalizeJobType(jobData.jobApplicationType);
    }
    
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

    res.json(serializeJob(job));
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
