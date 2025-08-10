const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const cors = require('cors');
app.use(cors({
  origin: [
    'https://pms-cgc-geeehojml-mohit-jadauns-projects.vercel.app', // your Vercel frontend URL
    'http://localhost:5173'
  ],
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

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placement';

mongoose.connect(MONGODB_URI, {
  // useNewUrlParser and useUnifiedTopology options are optional in newer versions
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));



// Use environment port or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
