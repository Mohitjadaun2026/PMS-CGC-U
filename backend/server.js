const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

for (const key of ["MONGO_URI", "JWT_SECRET"]) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

// Connect to database
const connectDB = require("./config/db.js");
connectDB();

// Import routes
const interviewExperienceRoutes = require("./routes/interviewExperienceRoutes");
const newsletterRoutes = require("./routes/newsletter");
const imageRoutes = require("./routes/imageRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminManagementRoutes = require("./routes/adminManagementRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// ===== Middleware =====

// Enable CORS for allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://localhost:5180",
  "http://127.0.0.1:5180",
  "https://pms-cgc-u.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Routes =====

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Campus Recruitment Portal Backend 🚀");
});

// API routes
app.use("/api/interview-experiences", interviewExperienceRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/uploads", imageRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin-management", adminManagementRoutes);
app.use("/api/profile", profileRoutes);

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
