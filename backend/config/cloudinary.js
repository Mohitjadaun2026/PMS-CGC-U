const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pms-cgc-company-logos', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 300, height: 300, crop: 'limit' }, // Resize images
      { quality: 'auto', fetch_format: 'auto' } // Optimize quality and format
    ],
    public_id: (req, file) => {
      // Generate unique filename
      return `company-logo-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    }
  },
});

module.exports = { cloudinary, storage };
