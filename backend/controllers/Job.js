const Job = require("../models/Jobs"); 
const Category = require("../models/Category");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter"); // Ensure the correct path
const jobApplicant = require("../models/jobApplicant");
const Jobs = require("../models/Jobs");
const Application = require("../models/Application");

// Create Job
exports.createJob = async (req, res) => {
  try {
      const recruiterId = req.user.id;

      // Check if the user is a recruiter
      const recruiter = await User.findById(recruiterId);
      if (!recruiter || recruiter.accountType !== "Recruiter") {
          return res.status(401).json({
              success: false,
              message: "You don't have permission to add a job"
          });
      }

      // Get data from request body
      const { title, company, description, maxApplicants, maxPositions, dateOfPosting, deadline, skillsets, jobType, salary, categoryName, location } = req.body;

      // Validate required fields
      if (!title || !company || !description || !maxApplicants || !maxPositions || !dateOfPosting || !deadline || !skillsets || !jobType || !salary || !categoryName || !location) {
          return res.status(400).json({
              success: false,
              message: "Please fill all the required fields"
          });
      }

      // Parse skillsets JSON string into an array
      let skillsetsArray;
      try {
          skillsetsArray = JSON.parse(skillsets);
      } catch (parseError) {
          return res.status(400).json({
              success: false,
              message: "Invalid skillsets format"
          });
      }

      // Find the category by ID
      const category = await Category.findById(categoryName);
      if (!category) {
          return res.status(404).json({
              success: false,
              message: "Category not found"
          });
      }

      // Create the job
      const newJob = await Job.create({
          userId: recruiterId,
          title,
          description,
          maxApplicants,
          maxPositions,
          dateOfPosting,
          deadline,
          skillsets: skillsetsArray, // Save skillsets as an array
          jobType,
          salary,
          category: category._id,
          location,
          company,
      });

      // Add the new job to the recruiter's job list in the Recruiter model
      await Recruiter.findOneAndUpdate(
          { userId: recruiterId },
          { $push: { jobs: newJob._id } },
          { new: true }
      );

      // Add the new job to the category's job list
      await Category.findByIdAndUpdate(
          category._id,
          { $push: { jobs: newJob._id } },
          { new: true }
      );

      // Respond with success
      return res.status(201).json({
          success: true,
          message: "Job created successfully",
          data: newJob
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Failed to create job",
          error: error.message
      });
  }
};


exports.getFullJobDetails = async(req,res) => {
  try{
    const { jobId } = req.body
    const userId = req.user.id
    const jobDetails = await Job.findOne({_id:jobId});
    if (!jobDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find Job with id: ${jobId}`,
      })
    }

    return res.status(200).json({
      success: true,
      data: {
        jobDetails,
      },
    })
  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get All Jobs w.r.t recruiter
exports.getAllJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id; 
    const allJobs = await Job.find(
      { userId: recruiterId },
      {
        title: true,
        description:true,
        maxApplicants:true,
        maxPositions: true,
        dateOfPosting: true,
        salary: true,
        jobType: true,
        deadline: true,
        skillsets: true,
        category:true,
        location:true,
        company:true
      }
    )
    .populate("userId", "name") // Assuming you want to show the name of the user who posted the job
    // .populate("category", "name") // Assuming the category has a name field
    .exec();

    return res.status(200).json({
      success: true,
      data: allJobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//Get All jobs for applicant
exports.getAllJobsApplicant = async (req, res) => {
  try {
    const allJobs = await Job.find(
      {},
      {
        title: true,
        description:true,
        maxPositions: true,
        maxApplicants:true,
        dateOfPosting: true,
        salary: true,
        jobType: true,
        deadline: true,
        skillsets: true,
        category:true,
        location:true,
        company:true
      }
    )
    .populate("userId", "name") // Assuming you want to show the name of the user who posted the job
    // .populate("category", "name") // Assuming the category has a name field
    .exec();

    return res.status(200).json({
      success: true,
      data: allJobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get Info about a particular job
exports.findJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job does not exist" });
    }

    // Send a success response with job data
    res.status(200).json({
      success: true,
      message: "Job found successfully",
      data: job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Update the job details
exports.updateJob = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User information is missing",
      });
    }

    const recruiterId = req.user.id;

    // Check if the user is a recruiter
    const recruiter = await User.findById(recruiterId);
    if (!recruiter || recruiter.accountType !== "Recruiter") {
      return res.status(401).json({
        success: false,
        message: "You don't have permissions to change the job details",
      });
    }

    // Find the job by ID and ensure it belongs to the recruiter
    const job = await Job.findOne({ _id: req.params.id, userId: recruiterId });

    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: "Job does not exist or you don't have permission to update this job" 
      });
    }

    // Update job details
    const { maxApplicants, maxPositions, deadline } = req.body;
    
    if (maxApplicants) {
      job.maxApplicants = maxApplicants;
    }
    if (maxPositions) {
      job.maxPositions = maxPositions;
    }
    if (deadline) {
      job.deadline = deadline;
    }

    // Save the updated job
    await job.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Job details updated successfully",
      data: job,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update job",
      error: error.message,
    });
  }
};

// Delete the Job
exports.deleteJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const jobId = req.params.id;

    // Ensure the user is a recruiter
    const recruiter = await User.findById(recruiterId);
    if (!recruiter || recruiter.accountType !== "Recruiter") {
      return res.status(403).json({
        success: false,
        message: "You don't have permissions to delete the job",
      });
    }

    // Attempt to find and delete the job
    const job = await Job.findOneAndDelete({ _id: jobId, userId: recruiterId });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you don't have permission to delete this job",
      });
    }

    // Update Category collection
    const categoryUpdateResult = await Category.updateMany(
      { jobs: jobId },
      { $pull: { jobs: jobId } }
    );

    // Update Recruiter collection
    const recruiterUpdateResult = await Recruiter.updateOne(
      { userId: recruiterId },
      { $pull: { jobs: jobId } }
    );

    // Check if the recruiter was updated successfully
    if (recruiterUpdateResult.modifiedCount === 0) {
      console.log("No recruiter document was updated. Check if the job ID is correct or if the recruiter has this job.");
    }

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
      error: error.message,
    });
  }
};
