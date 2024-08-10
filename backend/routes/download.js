const express = require("express");
const {getResumeFile,getProfileFile} = require("../controllers/Download");
const { auth } = require("../middleware/authorization");

const router = express.Router();

router.get("/resume/:file",auth,getResumeFile);
router.get("/profile/:file", auth,getProfileFile);

module.exports = router;
