const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Serve images from uploads folder
router.get('/:filename', (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Image not found: ${req.params.filename}`);
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Set proper headers for images
    const ext = path.extname(req.params.filename).toLowerCase();
    const mimeTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp'
    };
    
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({ error: 'Error serving image' });
  }
});

module.exports = router;