const bcrypt = require('bcrypt');
const { z } = require('zod');
const User = require('../models/User');

const inviteAdminSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  name: z.string().min(2).max(100),
  role: z.enum(['admin', 'super_admin']).default('admin')
});

const updateAdminSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  role: z.enum(['admin', 'super_admin']).optional(),
  isActive: z.boolean().optional()
});

// Get all admins (super admin only)
exports.getAllAdmins = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Super admin access required' });
    }

    const admins = await User.find({ 
      role: { $in: ['admin', 'super_admin'] } 
    }).select('-passwordHash');

    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Invite new admin (super admin only)
exports.inviteAdmin = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Super admin access required' });
    }

    const payload = inviteAdminSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).toUpperCase().slice(-4) + '!1';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(tempPassword, saltRounds);

    // Create admin user
    const adminUser = new User({
      name: payload.name,
      email: payload.email,
      passwordHash,
      role: payload.role,
      isSuperAdmin: payload.role === 'super_admin',
      createdBy: req.user.id,
      forcePasswordChange: true
    });

    await adminUser.save();

    // In production, send email with temp password
    console.log(`New admin created: ${payload.email}, Temporary password: ${tempPassword}`);

    res.status(201).json({
      message: 'Admin invited successfully',
      user: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        tempPassword // Remove this in production, send via email
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.flatten() });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update admin (super admin only)
exports.updateAdmin = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Super admin access required' });
    }

    const payload = updateAdminSchema.parse(req.body);
    const adminId = req.params.id;

    // Prevent updating own role
    if (adminId === req.user.id) {
      return res.status(400).json({ error: 'Cannot update your own admin privileges' });
    }

    const admin = await User.findById(adminId);
    if (!admin || !['admin', 'super_admin'].includes(admin.role)) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Update fields
    if (payload.name) admin.name = payload.name;
    if (payload.role) {
      admin.role = payload.role;
      admin.isSuperAdmin = payload.role === 'super_admin';
    }
    if (payload.isActive !== undefined) admin.isActive = payload.isActive;

    await admin.save();

    res.json({
      message: 'Admin updated successfully',
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.flatten() });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete admin (super admin only)
exports.deleteAdmin = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ error: 'Super admin access required' });
    }

    const adminId = req.params.id;

    // Prevent deleting self
    if (adminId === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const admin = await User.findById(adminId);
    if (!admin || !['admin', 'super_admin'].includes(admin.role)) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    await User.findByIdAndDelete(adminId);

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Change password (any admin)
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    user.passwordHash = passwordHash;
    user.lastPasswordChange = new Date();
    user.forcePasswordChange = false;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

