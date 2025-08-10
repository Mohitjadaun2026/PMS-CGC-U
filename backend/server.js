const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for all origins (you can restrict this later)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://your-frontend-domain.onrender.com'],
  credentials: true
}));

// Friendly message for root route
app.get('/', (req, res) => {
  res.send('Welcome to PMS-CGC-U Backend 🚀');
});

app.use(express.json());

// Serve images
const imageRoutes = require('./routes/imageRoutes');
app.use('/uploads', imageRoutes);

// Job routes
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
// Use environment port or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
