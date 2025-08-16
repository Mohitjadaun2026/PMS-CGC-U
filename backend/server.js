const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();

// ✅ Allowed origins (production + local dev)
const allowedOrigins = [
  'https://pms-cgc-u.vercel.app',
  'http://localhost:5180'
];

// ✅ Dynamic CORS setup
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow request
    } else {
      console.log('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Debugging: log request origins
app.use((req, res, next) => {
  console.log("➡️ Request Origin:", req.headers.origin);
  next();
});

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

// Error handling middleware for multer and other errors
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Unexpected file field.' });
    }
    return res.status(400).json({ error: `Upload error: ${error.message}` });
  }
  
  if (error.message && error.message.includes('Only image files are allowed')) {
    return res.status(400).json({ error: error.message });
  }
  
  // Generic error response
  res.status(500).json({ 
    error: 'Internal server error', 
    details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Connect to MongoDB (use environment variable for production)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placement';

console.log('🔍 Attempting MongoDB connection...');
console.log('📊 Environment check:', {
  hasMongoURI: !!process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully');
    console.log('🎯 Database:', MONGODB_URI.split('/')[3]?.split('?')[0] || 'default');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('🔗 URI being used:', MONGODB_URI.replace(/:[^:@]*@/, ':***@')); // Hide password in logs
    console.error('💡 Check: 1) MongoDB Atlas credentials 2) Network access 3) Database name');
    
    // Don't exit in production to allow for retries
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  });

// Use environment port or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
