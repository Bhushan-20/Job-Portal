const express = require("express");
const router = express.Router();

const { createCategory, getAllCategories } = require("../controllers/Category");
const { auth, isAdmin, isApplicant, isRecruiter } = require("../middleware/authorization");
const { createJob, getAllJobs, findJob,updateJob,deleteJob} = require("../controllers/Job");

// ********************************************************************************************************
//                                      Category Routes (Only by Admin)
// ********************************************************************************************************

// Create Category - Admin only
router.post("/createCategory", auth, isAdmin, createCategory);

// Get All Categories - Public
router.get("/showAllCategories", getAllCategories);

// ********************************************************************************************************
//                                      Job Routes
// ********************************************************************************************************

// Create Job - Recruiters only
router.post("/createJob", auth, isRecruiter, createJob);
router.get("/showAlljobs",auth,getAllJobs);
router.get("/getJob/:id", auth, findJob); // Get Info about a particular job
router.put("/updateJob/:id",auth,isRecruiter,updateJob);
router.delete("/deleteJob/:id",auth,isRecruiter,deleteJob);

module.exports = router;
