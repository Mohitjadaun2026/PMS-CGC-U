const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/placement';
    await mongoose.connect(mongoUri, {
      dbName: "PMS-CGC-U",
      retryWrites: true,
      w: "majority",
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    console.error("URI attempting to use:", process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/placement');
    process.exit(1);
  }
};

module.exports = connectDB;
