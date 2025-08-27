# 🎓 Admin Authentication Setup Guide

This guide will help you set up the admin authentication system for the Placement Management System.

## 🔧 Backend Setup

### 1. Install Dependencies
```bash
cd PMS-CGC-U/backend
npm install
```

### 2. Create Environment 
Create a `.env` file in the `backend` directory:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placement
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
```

### 3. Create Admin User
Run the script to create the default admin user:
```bash
npm run create-admin
```

This will create an admin user with:
- **Email**: admin@cgcu.edu
- **Password**: admin123
- **Role**: admin

### 4. Start Backend Server
```bash
npm run dev
```

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
cd PMS-CGC-U/frontend
npm install
```

### 2. Start Frontend Development Server
```bash
npm run dev
```

## 🔐 Admin Access

### Access Admin Panel
1. Navigate to `/admin-login` in your browser
2. Login with the admin credentials:
   - Email: `admin@cgcu.edu`
   - Password: `admin123`

### Admin Features
- ✅ **Protected Routes**: Only authenticated admins can access `/admin-job-posting`
- ✅ **Role-Based Access**: Only users with `admin` role can perform admin actions
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Auto Logout**: Automatic logout on token expiration
- ✅ **Secure Headers**: All admin API calls include JWT tokens

### Admin Panel Capabilities
- 📝 Create new job postings
- ✏️ Edit existing job postings
- 🗑️ Delete job postings
- 📊 View all job postings in a table format
- 🔒 Secure access with admin authentication

## 🛡️ Security Features

### Backend Security
- **JWT Verification**: All admin routes verify JWT tokens
- **Role-Based Access Control**: Admin-only routes protected
- **Password Hashing**: Passwords hashed with bcrypt
- **Input Validation**: Zod schema validation for all inputs
- **CORS Protection**: Configured for specific origins

### Frontend Security
- **Route Protection**: ProtectedRoute component guards admin routes
- **Token Storage**: JWT tokens stored securely in localStorage
- **Auto Redirect**: Unauthorized users redirected to login
- **Session Management**: Automatic logout on token expiration

## 🔄 API Endpoints

### Public Endpoints
- `GET /api/jobs` - Get all job postings (public)

### Protected Endpoints (Admin Only)
- `POST /api/jobs` - Create new job posting
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job posting
- `GET /api/auth/me` - Get current user info

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user

## 🚀 Usage Flow

1. **Admin Login**: Visit `/admin-login` and authenticate
2. **Access Panel**: Automatically redirected to `/admin-job-posting`
3. **Manage Jobs**: Create, edit, or delete job postings
4. **Logout**: Click logout button to end session

## 🔧 Customization

### Create Additional Admin Users
You can create additional admin users by:
1. Using the regular signup endpoint with admin role
2. Manually adding users to the database with `role: 'admin'`

### Change Default Admin Credentials
1. Delete the existing admin user from the database
2. Run `npm run create-admin` again with modified credentials in the script

### Modify JWT Settings
Update the JWT configuration in your `.env` file:
```bash
JWT_SECRET=your_new_secret_key
JWT_EXPIRES_IN=30d  # Change token expiration
```

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running
2. **JWT Token Expired**: Re-login to get a new token
3. **CORS Errors**: Check CORS configuration in server.js
4. **Admin Access Denied**: Verify user has `admin` role

### Debug Mode
Enable debug logging by adding to your `.env`:
```bash
DEBUG=true
```

## 📝 Notes

- The admin panel is now fully protected and requires authentication
- All job management operations require admin privileges
- Students can still view jobs through the public `/jobs` endpoint
- JWT tokens expire after 7 days by default
- Admin sessions are maintained in localStorage

For additional security, consider:
- Implementing rate limiting
- Adding two-factor authentication
- Using HTTPS in production
- Regular password rotation policies

