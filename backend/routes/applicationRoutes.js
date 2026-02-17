const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const applicationController = require('../controllers/applicationController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Ensure directories exist
const uploadDirs = ['uploads', 'uploads/resumes'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Multer setup for resume uploads
const resumeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

const resumeUpload = multer({ 
  storage: resumeStorage,
  fileFilter: (req, file, cb) => {
    // Accept only PDF and DOC files
    const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Public routes
router.post('/submit', resumeUpload.single('resume'), applicationController.submitApplication);

// Protected routes (student)
router.get('/student/:userId', requireAuth, applicationController.getStudentApplications);
router.get('/download/:applicationId', requireAuth, applicationController.downloadResume);

// Protected routes (admin only)
router.get('/job/:jobId', requireAuth, requireAdmin, applicationController.getJobApplications);
router.get('/all', requireAuth, requireAdmin, applicationController.getAllApplications);
router.put('/:applicationId/status', requireAuth, requireAdmin, applicationController.updateApplicationStatus);
router.get('/stats', requireAuth, requireAdmin, applicationController.getApplicationStats);

module.exports = router;
