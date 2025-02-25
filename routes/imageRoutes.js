const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadImage } = require('../controllers/imageController');
const Image = require('../models/Image'); // ✅ Import the Image model
const router = express.Router();

// Upload an image (Only admin users)
router.post('/upload', authMiddleware, adminMiddleware, upload.single('image'), uploadImage);

// Get all uploaded images
router.get('/images', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Images retrieved successfully.',
            totalImages: images.length,
            images
        });

    } catch (error) {
        console.error("Fetch Images Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error. Unable to retrieve images.',
            error: error.message
        });
    }
});

module.exports = router;
