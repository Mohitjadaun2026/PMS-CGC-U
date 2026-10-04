const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

async function createSuperAdmin() {
  try {
    // Super Admin credentials
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!process.env.MONGO_URI || !adminEmail || !adminPassword) {
      throw new Error('Set MONGO_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in backend/.env');
    }
    const adminName = 'Super Admin';

    // Connect to MongoDB using environment variable
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Campus-Recruitment-Portal",
      retryWrites: true,
      w: "majority",
    });
    console.log('✅ Connected to MongoDB - Campus-Recruitment-Portal database');

    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ role: 'super_admin' });
    if (existingSuperAdmin) {
      console.log('⚠️  Super admin already exists');
      console.log(`   Email: ${existingSuperAdmin.email}`);
      console.log(`   Name: ${existingSuperAdmin.name}`);
      
      // Update existing super admin credentials to new ones
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(adminPassword, saltRounds);
      
      existingSuperAdmin.email = adminEmail;
      existingSuperAdmin.name = adminName;
      existingSuperAdmin.passwordHash = passwordHash;
      await existingSuperAdmin.save();
      
      console.log('✅ Updated existing super admin with new credentials');
      console.log(`   New Email: ${adminEmail}`);
      console.log(`   New Name: ${adminName}`);
      process.exit(0);
    }

    // Check if admin with this email exists
    const existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
      console.log(`⚠️  User with email ${adminEmail} already exists`);
      console.log(`   Current role: ${existingUser.role}`);
      
      // Update to super admin if not already
      if (existingUser.role !== 'super_admin') {
        existingUser.role = 'super_admin';
        existingUser.isSuperAdmin = true;
        await existingUser.save();
        console.log('✅ Updated user to super admin');
      }
      process.exit(0);
    }

    // Create super admin user
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

    const superAdmin = new User({
      name: adminName,
      email: adminEmail,
      passwordHash,
      role: 'super_admin',
      isSuperAdmin: true,
      isActive: true
    });

    await superAdmin.save();
    console.log('✅ Super admin created successfully!');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Name: ${adminName}`);
    console.log(`   Role: super_admin`);
    console.log('🔐 Please change the password after first login');

  } catch (error) {
    console.error('❌ Error creating super admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createSuperAdmin();
