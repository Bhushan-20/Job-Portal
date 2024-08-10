const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");

const pipeline = promisify(require("stream").pipeline);

exports.uploadResume = async (req, res) => {
    const { file } = req;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    if (file.detectedFileExtension !== ".pdf") {
        return res.status(400).json({ message: "Invalid format, only PDF allowed" });
    }

    const filename = `${uuidv4()}${file.detectedFileExtension}`;
    const resumePath = path.join(__dirname, `../public/resume/${filename}`);

    try {
        await pipeline(file.stream, fs.createWriteStream(resumePath));
        res.status(200).json({
            message: "Resume uploaded successfully",
            url: `/host/resume/${filename}`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error while uploading resume" });
    }
};

exports.uploadProfileImage = async (req, res) => {
    const { file } = req;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    if (![".jpg", ".png"].includes(file.detectedFileExtension)) {
        return res.status(400).json({ message: "Invalid format, only JPG and PNG allowed" });
    }

    const filename = `${uuidv4()}${file.detectedFileExtension}`;
    const profilePath = path.join(__dirname, `../public/profile/${filename}`);

    try {
        await pipeline(file.stream, fs.createWriteStream(profilePath));
        res.status(200).json({
            message: "Profile image uploaded successfully",
            url: `/host/profile/${filename}`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error while uploading profile image" });
    }
};
