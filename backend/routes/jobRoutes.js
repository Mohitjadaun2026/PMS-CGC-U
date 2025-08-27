const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jobController = require('../controllers/jobControllers');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Local storage configuration
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
console.log('📁 Using local storage for image uploads');

// Configure multer with the selected storage
const upload = multer({ 
  storage: uploadStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// Public routes (read-only)
router.get('/', jobController.getAllJobs);

// Protected routes (admin only)
router.post('/', requireAuth, requireAdmin, upload.single('companyLogo'), jobController.createJob);
router.put('/:id', requireAuth, requireAdmin, upload.single('companyLogo'), jobController.updateJob);
router.delete('/:id', requireAuth, requireAdmin, jobController.deleteJob);

module.exports = router;