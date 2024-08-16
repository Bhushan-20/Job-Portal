const { cloudinaryConnect } = require("../config/cloudinary");
const mongoose = require('mongoose');
const cloudinary = require("cloudinary").v2; //! Cloudinary is being required
const jobApplicant = require("../models/jobApplicant")
require("dotenv").config();
const path = require("path");  // Used for working with file paths
const {uploadFileToCloudinary}  = require("../utils/fileUploader")


exports.localFileUpload = async(req,res) => {
    try{
        const file = req.files.file;
        //console.log("File",file); 
        let path = __dirname + "/resumefiles/" + Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path,(err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"File Uploaded Successfully"
        })
    }
    catch(error){
        console.log(error);
    }
}


exports.uploadResume = async (req, res) => {
    try {
        const user = req.user;
        const userId = req.user.id;
        const file = req.files.resume;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const applicant = await jobApplicant.findOne({ userId });
        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: "Applicant details not found",
            });
        }

        const supportedTypes = ["pdf", "docx"];
        const fileType = file.name.split('.').pop().toLowerCase();
        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        const folderName = process.env.FOLDER_NAME || "resumes";
        const uploadedResume = await uploadFileToCloudinary(file, folderName);
        applicant.resume = uploadedResume.secure_url;

        await applicant.save();
        const updatedApplicant = await jobApplicant.findOne({ userId });

        return res.status(200).json({
            success: true,
            updatedApplicant,
            message: "Resume Uploaded successfully",
        });
    } catch (error) {
        console.error("Error uploading resume:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while uploading the resume",
            error: error.message,
        });
    }
};
