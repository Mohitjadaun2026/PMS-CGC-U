# 👑 Super Admin System Setup Guide

This guide will help you set up the new hierarchical admin system with super admin functionality.

## 🎯 **What's New**

### **Hierarchical Admin System:**
- **Super Admin**: Full system control, can create/manage other admins
- **Regular Admin**: Can manage job postings only
- **Environment-based setup**: No more hardcoded credentials
- **Admin Management Dashboard**: Visual interface for admin management

## 🔧 **Backend Setup**

### 1. **Update Environment Variables**
Create/update your `.env` file in the `backend` directory:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placement
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Super Admin Setup (REQUIRED)
ADMIN_EMAIL=your-super-admin@email.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=Your Name (optional)
```

### 2. **Install Dependencies**
```bash
cd PMS-CGC-U/backend
npm install
```

### 3. **Create Super Admin**
```bash
npm run create-super-admin
```

This will:
- ✅ Check for required environment variables
- ✅ Create the first super admin user
- ✅ Set proper role and permissions
- ✅ Show success message with credentials

### 4. **Start Backend Server**
```bash
npm run dev
```

## 🎨 **Frontend Setup**

### 1. **Install Dependencies**
```bash
cd PMS-CGC-U/frontend
npm install
```

### 2. **Start Frontend Development Server**
```bash
npm run dev
```

## 🔐 **Admin Access & Features**

### **Super Admin Capabilities:**
- 👑 **Full System Control**: Access to all admin features
- 🔧 **Admin Management**: Create, edit, delete other admins
- 📝 **Job Management**: Full CRUD operations on job postings
- 👥 **User Management**: View and manage all admin users
- 🔒 **Security Control**: Manage admin permissions and roles

### **Regular Admin Capabilities:**
- 📝 **Job Management**: Create, edit, delete job postings
- 👤 **Profile Management**: Change own password
- 📊 **Job Analytics**: View and manage job postings

## 🚀 **Usage Flow**

### **1. Super Admin Login**
1. Navigate to `/admin-login`
2. Login with super admin credentials from `.env`
3. Access both "Job Management" and "Admin Management"

### **2. Create Additional Admins**
1. Click "🔧 Admin Management" in the header
2. Click "➕ Invite Admin"
3. Fill in admin details (name, email, role)
4. System generates temporary password
5. New admin receives credentials

### **3. Admin Management Features**
- **View All Admins**: See all admin users in the system
- **Invite New Admins**: Create admin or super admin accounts
- **Activate/Deactivate**: Toggle admin account status
- **Delete Admins**: Remove admin accounts (with confirmation)
- **Role Management**: Assign admin or super admin roles

## 🔄 **API Endpoints**

### **Super Admin Only Endpoints:**
- `GET /api/admin/admins` - Get all admins
- `POST /api/admin/invite` - Invite new admin
- `PUT /api/admin/admins/:id` - Update admin
- `DELETE /api/admin/admins/:id` - Delete admin

### **All Admin Endpoints:**
- `POST /api/admin/change-password` - Change password
- `GET /api/jobs` - Get all jobs (public)
- `POST /api/jobs` - Create job (admin only)
- `PUT /api/jobs/:id` - Update job (admin only)
- `DELETE /api/jobs/:id` - Delete job (admin only)

## 🛡️ **Security Features**

### **Enhanced Security:**
- **Role-Based Access Control**: Super admin vs regular admin
- **Environment Variables**: No hardcoded credentials
- **Temporary Passwords**: Generated for new admin accounts
- **Account Status Management**: Activate/deactivate admin accounts
- **Self-Protection**: Super admins can't delete themselves
- **Audit Trail**: Track admin creation and modifications

### **Production Considerations:**
- **Email Integration**: Replace console.log with email sending
- **Password Policies**: Implement password complexity requirements
- **Session Management**: Add session timeouts and limits
- **IP Whitelisting**: Restrict admin access to specific IPs
- **Activity Logging**: Log all admin actions for audit

## 🔧 **Customization Options**

### **Environment Variables:**
```bash
# Customize admin setup
ADMIN_EMAIL=your-email@domain.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=Your Full Name

# JWT Configuration
JWT_SECRET=your-very-long-secret-key
JWT_EXPIRES_IN=30d

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/placement
```

### **Role Hierarchy:**
- **super_admin**: Full system access
- **admin**: Job management only
- **user**: Regular user access (future)

## 🐛 **Troubleshooting**

### **Common Issues:**

1. **"Super admin already exists"**
   - The system detected an existing super admin
   - Use existing credentials or update via database

2. **"Missing environment variables"**
   - Ensure ADMIN_EMAIL and ADMIN_PASSWORD are set in `.env`
   - Restart the server after updating environment variables

3. **"Access denied" errors**
   - Verify user has correct role (admin or super_admin)
   - Check JWT token validity
   - Ensure proper authorization headers

4. **Admin management not visible**
   - Only super admins can see admin management
   - Regular admins only see job management

### **Debug Mode:**
Add to your `.env`:
```bash
DEBUG=true
NODE_ENV=development
```

## 📝 **Migration from Old System**

### **If you have existing admin users:**
1. Run the super admin creation script
2. Existing admin users will be preserved
3. First admin created becomes super admin
4. Update existing users via admin management dashboard

### **Database Migration:**
The system automatically handles:
- ✅ Role field updates
- ✅ New admin fields
- ✅ Backward compatibility
- ✅ Existing user preservation

## 🎉 **Success Indicators**

### **System is working when:**
- ✅ Super admin can login at `/admin-login`
- ✅ Admin management dashboard is accessible
- ✅ New admins can be invited successfully
- ✅ Job management works for all admins
- ✅ Role-based access control is enforced
- ✅ No hardcoded credentials in code

## 🔮 **Future Enhancements**

### **Planned Features:**
- 📧 **Email Integration**: Send admin invitations via email
- 🔐 **Two-Factor Authentication**: Enhanced security
- 📊 **Admin Analytics**: Usage statistics and reports
- 🎯 **Permission Granularity**: Fine-grained access control
- 📝 **Audit Logs**: Detailed activity tracking
- 🔄 **Bulk Operations**: Mass admin management

---

## 🚀 **Quick Start Checklist**

- [ ] Set up `.env` with admin credentials
- [ ] Run `npm run create-super-admin`
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Login at `/admin-login`
- [ ] Access admin management dashboard
- [ ] Invite additional admins
- [ ] Test job management functionality

**🎯 You now have a production-ready hierarchical admin system!**

