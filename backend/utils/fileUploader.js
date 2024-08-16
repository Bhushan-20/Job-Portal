const cloudinary = require("cloudinary").v2;
const path = require("path");  // Used for working with file paths

exports.uploadFileToCloudinary = async (file, folder) => {
    // Get the file name without the extension
    const originalFileName = path.parse(file.name).name;

    const options = {
        folder,
        resource_type: "auto",  // Automatically detect the file type (e.g., pdf, docx, etc.)
        public_id: originalFileName  // This sets the name of the file in the Cloudinary folder
    };

    try {
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    }
};