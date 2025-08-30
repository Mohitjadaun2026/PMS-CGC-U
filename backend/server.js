const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = require("./config/db.js");

connectDB();

// Routes
let interviewExperienceRoutes, newsletterRoutes, imageRoutes, jobRoutes, authRoutes, adminRoutes, adminManagementRoutes;

try {
  interviewExperienceRoutes = require("./routes/interviewExperienceRoutes");
  newsletterRoutes = require("./routes/newsletter");
  imageRoutes = require("./routes/imageRoutes");
  jobRoutes = require("./routes/jobRoutes");
  authRoutes = require("./routes/authRoutes");
  adminRoutes = require("./routes/adminRoutes");
  adminManagementRoutes = require("./routes/adminManagementRoutes");
} catch (error) {
  console.error('Error loading routes:', error.message);
}

const app = express();

// Enable CORS for local dev and production
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://pms-cgc-u.vercel.app",
];
const corsOptions = {
  origin: 'https://pms-cgc-u.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
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

// Job routes are already defined above

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
// Use routes (with error checking)
if (interviewExperienceRoutes) app.use("/api/interview-experiences", interviewExperienceRoutes);
if (newsletterRoutes) app.use("/api/newsletter", newsletterRoutes);
if (imageRoutes) app.use("/uploads", imageRoutes);
if (jobRoutes) app.use("/api/jobs", jobRoutes);
if (authRoutes) app.use("/api/auth", authRoutes);
if (adminRoutes) app.use("/api/admin", adminRoutes);
if (adminManagementRoutes) app.use("/api/admin-management", adminManagementRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
