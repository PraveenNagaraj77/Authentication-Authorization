const { uploadToCloudinary } = require('../helpers/cloudinaryHelpers');
const Image = require('../models/Image');
const fs = require('fs');

const uploadImage = async (req, res) => {
    try {
        // Check if file is missing
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required. Please upload an image.'
            });
        }

        // Upload to Cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // Save to database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.id
        });

        await newlyUploadedImage.save();

        // Remove local file after Cloudinary upload
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully.',
            data: {
                id: newlyUploadedImage._id,
                url: newlyUploadedImage.url,
                uploadedBy: newlyUploadedImage.uploadedBy,
                createdAt: newlyUploadedImage.createdAt
            }
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error. Unable to upload image.',
            error: error.message
        });
    }
};

module.exports = { uploadImage };
