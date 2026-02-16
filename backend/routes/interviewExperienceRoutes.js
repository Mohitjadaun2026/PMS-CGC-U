const express = require('express');
const router = express.Router();
const interviewCtrl = require('../controllers/interviewExperienceController');
const { requireAuth } = require('../middleware/auth');

// Public routes
router.get('/', interviewCtrl.getAllExperiences);
router.get('/:id', interviewCtrl.getExperienceById);

// Private routes
router.post('/',requireAuth, interviewCtrl.addExperience);
router.put('/:id',requireAuth,interviewCtrl.editExperience)
router.delete('/:id',requireAuth,interviewCtrl.deleteExperience)

module.exports = router;
