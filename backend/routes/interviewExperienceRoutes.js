const express = require('express');
const router = express.Router();
const interviewCtrl = require('../controllers/interviewExperienceController');

// Public routes
router.get('/', interviewCtrl.getAllExperiences);
router.get('/:id', interviewCtrl.getExperienceById);
router.post('/', interviewCtrl.addExperience);

module.exports = router;
