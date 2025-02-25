

const cloudinary = require('../config/cloudinary');


const uploadToCloudinary = async (filePath) => {
    try {

        const result = await cloudinary.uploader.upload(filePath);

        return {
            url:result.secure_url,
            publicId:result.public_id
        }
        
    } catch (error) {
        console.log("Error While Uploading Cloudinary " ,error);
        throw new Error('Error While Uploading Cloudinary')
    }
}

module.exports = {uploadToCloudinary};