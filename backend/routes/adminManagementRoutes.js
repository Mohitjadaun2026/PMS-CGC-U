const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminContoller');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Get all admins (super admin only)
router.get('/admins', requireAuth, requireAdmin, adminController.getAllAdmins);

// Invite new admin (super admin only)
router.post('/invite', requireAuth, requireAdmin, adminController.inviteAdmin);

// Update admin (super admin only)
router.put('/update/:id', requireAuth, requireAdmin, adminController.updateAdmin);

// Delete admin (super admin only)
router.delete('/delete/:id', requireAuth, requireAdmin, adminController.deleteAdmin);

// Change password (any admin)
router.put('/change-password', requireAuth, requireAdmin, adminController.changePassword);

module.exports = router;
