const dns = require("dns");
const mongoose = require("mongoose");

const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

dns.setServers(dnsServers);

const connectDB = async (attempt = 1) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Campus-Recruitment-Portal",
      retryWrites: true,
      w: "majority",
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    const maxAttempts = 5;

    if (attempt >= maxAttempts) {
      console.error(`❌ MongoDB connection failed after ${maxAttempts} attempts:`, err.message);
      return;
    }

    const delay = attempt * 2000;
    console.error(`❌ MongoDB connection attempt ${attempt} failed: ${err.message}`);
    console.log(`Retrying MongoDB connection in ${delay / 1000}s...`);
    setTimeout(() => connectDB(attempt + 1), delay);
  }
};

module.exports = connectDB;
