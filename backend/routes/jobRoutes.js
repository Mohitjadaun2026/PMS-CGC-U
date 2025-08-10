const express = require('express');
const multer = require('multer');
const path = require('path');
const jobController = require('../controllers/jobControllers');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Job routes
router.get('/', jobController.getAllJobs);
router.post('/', upload.single('companyLogo'), jobController.createJob);
router.put('/:id', upload.single('companyLogo'), jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;