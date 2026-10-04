const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const profileController = require('../controllers/profileController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const resumeDirectory = path.join(__dirname, '..', 'uploads', 'resumes');
const profilePictureDirectory = path.join(__dirname, '..', 'uploads', 'profile-pictures');
fs.mkdirSync(resumeDirectory, { recursive: true });
fs.mkdirSync(profilePictureDirectory, { recursive: true });
const resumeUpload = multer({
	storage: multer.diskStorage({
		destination: resumeDirectory,
		filename: (_req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`),
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (_req, file, callback) => {
		const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
		callback(null, allowed.includes(file.mimetype));
	},
});
const profilePictureUpload = multer({
	storage: multer.diskStorage({
		destination: profilePictureDirectory,
		filename: (_req, file, callback) => {
			const extensions = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
			callback(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extensions[file.mimetype] || '.img'}`);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (_req, file, callback) => {
		const allowed = ['image/jpeg', 'image/png', 'image/webp'];
		callback(null, allowed.includes(file.mimetype));
	},
});

router.get('/me', requireAuth, profileController.getProfile);
router.put('/me', requireAuth, profileController.updateProfile);
router.post('/me/resume', requireAuth, resumeUpload.single('resume'), profileController.uploadResume);
router.post('/me/picture', requireAuth, (req, res, next) => {
	profilePictureUpload.single('profilePicture')(req, res, (error) => {
		if (!error) return next();
		const message = error.code === 'LIMIT_FILE_SIZE'
			? 'Profile picture must be smaller than 5 MB'
			: 'Could not upload this image. Use a PNG, JPG, or WebP file.';
		return res.status(400).json({ error: message });
	});
}, profileController.uploadProfilePicture);

module.exports = router;
