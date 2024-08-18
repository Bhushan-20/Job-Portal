const express = require("express");
const router = express.Router();

const {signup,login,sendotp,changePassword} = require("../controllers/Auth");
const {getUserDetails,updateUserDetails,applyForJob,getApplicationsForJob,getAllApplications,updateApplicationStatus,getApplicantsList,getApplicantDetails,getRecruiterDetails} = require("../controllers/User")
const {resetPassword,resetPasswordToken} = require("../controllers/ResetPassword")
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
router.get("/jobs/applications/:id",auth,isRecruiter,getApplicationsForJob);
router.get("/applications",auth,getAllApplications);
router.put("/updateapplicationstatus/:id",auth,isRecruiter,updateApplicationStatus);
router.get("/applicants",auth,isRecruiter,getApplicantsList);

// ********************************************************************************************************
//                                      Fetch Data routes
// ********************************************************************************************************
router.get("/applicantDetails",auth,getApplicantDetails);
router.get("/recruiterDetails",auth,isRecruiter,getRecruiterDetails);


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)



module.exports = router;