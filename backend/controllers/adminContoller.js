const bcrypt = require("bcrypt");
const { z } = require("zod");
const User = require("../models/User");

// ========================
// Validation Schemas
// ========================
const inviteAdminSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  name: z.string().min(2).max(100),
  role: z.enum(["admin", "super_admin"]).default("admin"),
});

const updateAdminSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  role: z.enum(["admin", "super_admin"]).optional(),
  isActive: z.boolean().optional(),
});

// ========================
// Helpers
// ========================
const sendError = (res, status, message, details = null) => {
  const response = { error: message };
  if (details) response.details = details;
  return res.status(status).json(response);
};

// ========================
// Controllers
// ========================

// Get all admins (super admin only)
exports.getAllAdmins = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      return sendError(res, 403, "Super admin access required");
    }

    const admins = await User.find({
      role: { $in: ["admin", "super_admin"] },
    }).select("-passwordHash");

    return res.json(admins);
  } catch {
    return sendError(res, 500, "Internal server error");
  }
};

// Invite new admin (super admin only)
exports.inviteAdmin = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      return sendError(res, 403, "Super admin access required");
    }

    const payload = inviteAdminSchema.parse(req.body);

    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return sendError(res, 409, "User with this email already exists");
    }

    const tempPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).toUpperCase().slice(-4) +
      "!1";

    const passwordHash = await bcrypt.hash(tempPassword, 10);

    const adminUser = new User({
      name: payload.name,
      email: payload.email,
      passwordHash,
      role: payload.role,
      isSuperAdmin: payload.role === "super_admin",
      createdBy: req.user.id,
      forcePasswordChange: true,
    });

    await adminUser.save();

    // TODO: Replace console.log with email service in production
    console.log(
      `New admin created: ${payload.email}, Temporary password: ${tempPassword}`
    );

    return res.status(201).json({
      message: "Admin invited successfully",
      user: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        tempPassword, // ⚠️ Only for development; should be sent via email in production
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 400, "Validation failed", error.flatten());
    }
    return sendError(res, 500, "Internal server error");
  }
};

// Update admin (super admin only)
exports.updateAdmin = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      return sendError(res, 403, "Super admin access required");
    }

    const payload = updateAdminSchema.parse(req.body);
    const adminId = req.params.id;

    if (adminId === req.user.id) {
      return sendError(res, 400, "Cannot update your own admin privileges");
    }

    const admin = await User.findById(adminId);
    if (!admin || !["admin", "super_admin"].includes(admin.role)) {
      return sendError(res, 404, "Admin not found");
    }

    if (payload.name) admin.name = payload.name;
    if (payload.role) {
      admin.role = payload.role;
      admin.isSuperAdmin = payload.role === "super_admin";
    }
    if (payload.isActive !== undefined) admin.isActive = payload.isActive;

    await admin.save();

    return res.json({
      message: "Admin updated successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 400, "Validation failed", error.flatten());
    }
    return sendError(res, 500, "Internal server error");
  }
};

// Delete admin (super admin only)
exports.deleteAdmin = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      return sendError(res, 403, "Super admin access required");
    }

    const adminId = req.params.id;

    if (adminId === req.user.id) {
      return sendError(res, 400, "Cannot delete your own account");
    }

    const admin = await User.findById(adminId);
    if (!admin || !["admin", "super_admin"].includes(admin.role)) {
      return sendError(res, 404, "Admin not found");
    }

    await User.findByIdAndDelete(adminId);

    return res.json({ message: "Admin deleted successfully" });
  } catch {
    return sendError(res, 500, "Internal server error");
  }
};

// Change password (any admin)
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return sendError(res, 400, "Current and new password required");
    }

    if (newPassword.length < 8) {
      return sendError(res, 400, "New password must be at least 8 characters");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return sendError(res, 401, "Current password is incorrect");
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.lastPasswordChange = new Date();
    user.forcePasswordChange = false;

    await user.save();

    return res.json({ message: "Password changed successfully" });
  } catch {
    return sendError(res, 500, "Internal server error");
  }
};
