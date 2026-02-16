const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/placement';

async function createAdminUser() {
  try {
    // Connect to MongoDB
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  console.log('Connected to DB:', mongoose.connection.name);
  console.log('Connected to Host:', mongoose.connection.host);

    // Check if admin already exists

    const newEmail = 'jadaunmohit0@gmail.com';
    const newPassword = 'Mohit@123';
    const existingAdmin = await User.findOne({ email: newEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    const adminUser = new User({
      name: 'System Administrator',
      email: newEmail,
      passwordHash,
      role: 'admin'
    });

    await adminUser.save();
  console.log('Admin user created successfully!');
  console.log('Email: ' + newEmail);
  console.log('Password: ' + newPassword);
  console.log('Role: admin');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdminUser();

