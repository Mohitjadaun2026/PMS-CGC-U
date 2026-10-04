const { z } = require('zod');
const User = require('../models/User');

const profileSchema = z.object({
	name: z.string().min(2).max(100).trim(),
	phone: z.string().max(30).trim().optional().default(''),
	rollNo: z.string().max(50).trim().optional().default(''),
	department: z.string().max(100).trim().optional().default(''),
	batch: z.string().max(30).trim().optional().default(''),
	semester: z.string().max(30).trim().optional().default(''),
	cgpa: z.coerce.number().min(0).max(10).nullable().optional(),
	backlogs: z.coerce.number().int().min(0).optional().default(0),
	skills: z.array(z.string().trim().min(1).max(50)).max(30).optional().default([]),
	certifications: z.array(z.string().trim().min(1).max(150)).max(30).optional().default([]),
	projects: z.array(z.object({ name: z.string().max(100), tech: z.string().max(150), status: z.string().max(50) })).max(30).optional().default([]),
	achievements: z.array(z.string().trim().min(1).max(150)).max(30).optional().default([]),
	linkedin: z.string().max(200).trim().optional().default(''),
	github: z.string().max(200).trim().optional().default(''),
});

const serializeProfile = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	role: user.role,
	phone: user.phone || '',
	rollNo: user.rollNo || '',
	department: user.department || '',
	batch: user.batch || '',
	semester: user.semester || '',
	cgpa: user.cgpa,
	backlogs: user.backlogs || 0,
	skills: user.skills || [],
	certifications: user.certifications || [],
	projects: user.projects || [],
	achievements: user.achievements || [],
	linkedin: user.linkedin || '',
	github: user.github || '',
	resumePath: user.resumePath || '',
	resumeFileName: user.resumeFileName || '',
	profilePicture: user.profilePicture || '',
});

exports.getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-passwordHash');
		if (!user) return res.status(404).json({ error: 'Profile not found' });
		return res.json(serializeProfile(user));
	} catch (error) {
		console.error('[PROFILE] Fetch error:', error.message);
		return res.status(500).json({ error: 'Failed to load profile' });
	}
};

exports.updateProfile = async (req, res) => {
	try {
		const payload = profileSchema.parse(req.body);
		const user = await User.findByIdAndUpdate(req.user.id, payload, {
			new: true,
			runValidators: true,
		}).select('-passwordHash');
		if (!user) return res.status(404).json({ error: 'Profile not found' });
		return res.json({ message: 'Profile updated successfully', profile: serializeProfile(user) });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: 'Validation failed', details: error.flatten() });
		}
		console.error('[PROFILE] Update error:', error.message);
		return res.status(500).json({ error: 'Failed to update profile' });
	}
};

exports.uploadResume = async (req, res) => {
	if (!req.file) return res.status(400).json({ error: 'A PDF or DOC resume is required' });
	try {
		const user = await User.findByIdAndUpdate(req.user.id, {
			resumePath: `/uploads/resumes/${req.file.filename}`,
			resumeFileName: req.file.originalname,
		}, { new: true }).select('-passwordHash');
		if (!user) return res.status(404).json({ error: 'Profile not found' });
		return res.json({ message: 'Resume uploaded successfully', profile: serializeProfile(user) });
	} catch (error) {
		console.error('[PROFILE] Resume upload error:', error.message);
		return res.status(500).json({ error: 'Failed to save resume' });
	}
};

exports.uploadProfilePicture = async (req, res) => {
	if (!req.file) return res.status(400).json({ error: 'Choose a PNG, JPG, or WebP image under 5 MB' });
	try {
		const user = await User.findByIdAndUpdate(req.user.id, {
			profilePicture: `/uploads/profile-pictures/${req.file.filename}`,
		}, { new: true }).select('-passwordHash');
		if (!user) return res.status(404).json({ error: 'Profile not found' });
		return res.json({ message: 'Profile picture updated successfully', profile: serializeProfile(user) });
	} catch (error) {
		console.error('[PROFILE] Picture upload error:', error.message);
		return res.status(500).json({ error: 'Failed to save profile picture' });
	}
};
