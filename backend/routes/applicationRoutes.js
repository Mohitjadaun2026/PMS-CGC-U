const express = require('express');
const multer = require('multer');
const path = require('path');
const applicationController = require('../controllers/applicationController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Multer setup for file uploads in applications
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/applications/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Public routes
router.post('/submit', upload.any(), applicationController.submitApplication);

// Protected routes (admin only)
router.get('/job/:jobId', requireAuth, requireAdmin, applicationController.getJobApplications);
router.get('/all', requireAuth, requireAdmin, applicationController.getAllApplications);
router.put('/:applicationId/status', requireAuth, requireAdmin, applicationController.updateApplicationStatus);
router.get('/stats', requireAuth, requireAdmin, applicationController.getApplicationStats);

module.exports = router;
