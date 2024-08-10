const express = require("express");
const router = express.Router();

const {signup,login,sendotp,changePassword} = require("../controllers/Auth");
const {getUserDetails,updateUserDetails,applyForJob,getApplicationsForJob,getAllApplications,updateApplicationStatus,getApplicantsList} = require("../controllers/User")

const {auth, isApplicant, isRecruiter} = require("../middleware/authorization");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************


// Route for user signup
router.post("/signup", signup)

//Route for user login
router.post("/login",login);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)


// ********************************************************************************************************
//                                      User Details routes
// ********************************************************************************************************
router.get("/userDetails",auth,getUserDetails);
router.post("/updateUserDetails",auth,updateUserDetails);
router.post("/jobs/:id/application",auth,isApplicant,applyForJob);
router.get("/jobs/:id/applications",auth,isRecruiter,getApplicationsForJob);
router.get("/applications",auth,getAllApplications);
router.put("/updateapplication/:id",auth,updateApplicationStatus);
router.get("/applicants",auth,isRecruiter,getApplicantsList);



module.exports = router;