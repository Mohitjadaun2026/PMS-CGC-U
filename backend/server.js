<<<<<<< HEAD
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
=======
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = require("./config/db.js");

connectDB();

// Routes
const interviewExperienceRoutes = require("./routes/interviewExperienceRoutes");
const newsletterRoutes = require("./routes/newsletter");
const imageRoutes = require("./routes/imageRoutes");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminManagementRoutes = require("./routes/adminManagementRoutes");
>>>>>>> 7169f5126df2da6c9df8d32b95ebf90aff4315f8

const app = express();

// Enable CORS for local dev and production
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://pms-cgc-u.vercel.app",
];
const corsOptions = {
<<<<<<< HEAD
  origin: 'https://pms-cgc-u.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
=======
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
>>>>>>> 7169f5126df2da6c9df8d32b95ebf90aff4315f8
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to PMS-CGC-U Backend 🚀");
});

<<<<<<< HEAD
// Job routes
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB (use environment variable for production)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placement';
mongoose.connect(MONGODB_URI)

  .then(() => {
    console.log(`✅ Connected to MongoDB Atlas [Env: ${process.env.NODE_ENV || 'development'}]`);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('URI attempting to use:', process.env.MONGODB_URI);
    process.exit(1);
  });

// Use environment port or default to 5000
const PORT = process.env.PORT || 5000;
=======
// Use routes
app.use("/api/interview-experiences", interviewExperienceRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/uploads", imageRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin-management", adminManagementRoutes);
>>>>>>> 7169f5126df2da6c9df8d32b95ebf90aff4315f8

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
