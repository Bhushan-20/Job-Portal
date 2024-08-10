const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadResume, uploadProfileImage } = require("../controllers/Upload");
const { auth } = require("../middleware/authorization");


// Set up multer for file upload handling
const upload = multer();

// ********************************************************************************************************
//                                      Upload Routes
// ********************************************************************************************************

// Upload Resume - Authenticated users only
router.post("/uploadResume", auth, upload.single("file"), uploadResume);

// Upload Profile Image - Authenticated users only
router.post("/uploadProfile", auth, upload.single("file"), uploadProfileImage);

module.exports = router;
