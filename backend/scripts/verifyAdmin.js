const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

async function verifyAdmin() {
  const email = process.env.ADMIN_EMAIL;
  if (!process.env.MONGO_URI || !email) {
    throw new Error('Set MONGO_URI and ADMIN_EMAIL in backend/.env');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admin = await User.findOne({ email }).select('email name role isActive');
    if (!admin) {
      console.log(`No account found for ${email}`);
      process.exitCode = 1;
      return;
    }
    console.log({
      email: admin.email,
      name: admin.name,
      role: admin.role,
      isActive: admin.isActive,
    });
  } finally {
    await mongoose.disconnect();
  }
}

verifyAdmin().catch((error) => {
  console.error('Admin verification failed:', error.message);
  process.exitCode = 1;
});
