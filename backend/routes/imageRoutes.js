const express = require('express');
const path = require('path');
const router = express.Router();

// Serve images from uploads folder
router.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
  res.sendFile(filePath);
});

module.exports = router;