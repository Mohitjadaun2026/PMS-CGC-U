const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for all origins (you can restrict this later)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://your-frontend-domain.onrender.com'],
  credentials: true
}));

app.use(express.json());

// Serve images
const imageRoutes = require('./routes/imageRoutes');
app.use('/uploads', imageRoutes);

// Job routes
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB (use environment variable for production)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placement';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use environment port or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});