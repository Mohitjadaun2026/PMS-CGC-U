const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

const corsOptions = {
  origin: ['https://pms-cgc-u.vercel.app', 'http://localhost:3000'],
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));


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

// Connect to MongoDB (use environment variable for production)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placement';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('URI attempting to use:', process.env.MONGODB_URI);
    process.exit(1);
  });

// Use environment port or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
