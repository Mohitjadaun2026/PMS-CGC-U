const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve images
const imageRoutes = require('./routes/imageRoutes');
app.use('/uploads', imageRoutes);

// Job routes
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/placement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});