const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

<<<<<<< HEAD
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/placement';
=======
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placement';
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc

async function createAdminUser() {
  try {
    // Connect to MongoDB
<<<<<<< HEAD
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  console.log('Connected to DB:', mongoose.connection.name);
  console.log('Connected to Host:', mongoose.connection.host);

    // Check if admin already exists

    const newEmail = 'jadaunmohit0@gmail.com';
    const newPassword = 'Mohit@123';
    const existingAdmin = await User.findOne({ email: newEmail });
=======
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@cgcu.edu' });
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const saltRounds = 10;
<<<<<<< HEAD
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    const adminUser = new User({
      name: 'System Administrator',
      email: newEmail,
=======
    const passwordHash = await bcrypt.hash('admin123', saltRounds);

    const adminUser = new User({
      name: 'System Administrator',
      email: 'admin@cgcu.edu',
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
      passwordHash,
      role: 'admin'
    });

    await adminUser.save();
<<<<<<< HEAD
  console.log('Admin user created successfully!');
  console.log('Email: ' + newEmail);
  console.log('Password: ' + newPassword);
  console.log('Role: admin');
=======
    console.log('Admin user created successfully!');
    console.log('Email: admin@cgcu.edu');
    console.log('Password: admin123');
    console.log('Role: admin');
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdminUser();

