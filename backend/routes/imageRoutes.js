const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Serve images and documents from uploads folder
router.get('/:filename', (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${req.params.filename}`);
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Set proper headers for different file types
    const ext = path.extname(req.params.filename).toLowerCase();
    const mimeTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);
    
    // For images, cache for longer; for documents, shorter cache or no cache
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache images for 1 day
    } else {
      res.setHeader('Cache-Control', 'no-cache'); // Don't cache documents
    }
    
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({ error: 'Error serving file' });
  }
});

// Serve resumes from resumes subdirectory
router.get('/resumes/:filename', (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', 'resumes', req.params.filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Resume not found: ${req.params.filename}`);
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    const ext = path.extname(req.params.filename).toLowerCase();
    const mimeTypes = {
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'no-cache');
    
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error serving resume:', error);
    res.status(500).json({ error: 'Error serving resume' });
  }
});

module.exports = router;