const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Allowed origins (production + local dev)
const allowedOrigins = [
  'https://pms-cgc-u.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5178',
  'http://localhost:5179'
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

// Connect to MongoDB (use environment variable for production)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placement';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.error('URI attempting to use:', process.env.MONGODB_URI);
    process.exit(1);
  });

// Use environment port or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
