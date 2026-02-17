const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI); // Debug log
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "PMS-CGC-U",
      retryWrites: true,
      w: "majority",
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
