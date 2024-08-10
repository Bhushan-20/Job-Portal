const Job = require("../models/Jobs"); 
const Category = require("../models/Category");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter"); // Ensure the correct path
const jobApplicant = require("../models/jobApplicant");

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
        const { title, description, maxApplicants, maxPositions, dateOfPosting, deadline, skillsets, jobType, salary, categoryName } = req.body;

        // Validate required fields
        if (!title || !description || !maxApplicants || !maxPositions || !dateOfPosting || !deadline || !skillsets || !jobType || !salary || !categoryName) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            });
        }

        // Find the category by name
        const category = await Category.findOne({ name: categoryName });
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
            skillsets,
            jobType,
            salary,
            category: category._id
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

//Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const user = req.user;
    let findParams = {};
    let sortParams = {};

    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter by recruiter jobs
    if (user.accountType === "Recruiter" && req.query.myjobs) {
      findParams.userId = user._id;
    }

    // Search by title
    if (req.query.q) {
      findParams.title = { $regex: new RegExp(req.query.q, "i") };
    }

    // Filter by job type
    if (req.query.jobType) {
      let jobTypes = Array.isArray(req.query.jobType) ? req.query.jobType : [req.query.jobType];
      findParams.jobType = { $in: jobTypes };
    }

    // Filter by salary range
    if (req.query.salaryMin && req.query.salaryMax) {
      findParams.salary = { $gte: parseInt(req.query.salaryMin), $lte: parseInt(req.query.salaryMax) };
    } else if (req.query.salaryMin) {
      findParams.salary = { $gte: parseInt(req.query.salaryMin) };
    } else if (req.query.salaryMax) {
      findParams.salary = { $lte: parseInt(req.query.salaryMax) };
    }

    // Filter by job duration
    if (req.query.duration) {
      findParams.duration = { $lt: parseInt(req.query.duration) };
    }

    // Sorting parameters
    if (req.query.asc) {
      let sortKeys = Array.isArray(req.query.asc) ? req.query.asc : [req.query.asc];
      sortKeys.forEach(key => { sortParams[key] = 1; });
    }

    if (req.query.desc) {
      let sortKeys = Array.isArray(req.query.desc) ? req.query.desc : [req.query.desc];
      sortKeys.forEach(key => { sortParams[key] = -1; });
    }

    // Aggregation pipeline
    let aggregationPipeline = [
      {
        $lookup: {
          from: "recruiterinfos",
          localField: "userId",
          foreignField: "userId",
          as: "Recruiter"
        }
      },
      { $unwind: "$Recruiter" },
      { $match: findParams },
      { $skip: skip },
      { $limit: limit }
    ];

    if (Object.keys(sortParams).length > 0) {
      aggregationPipeline.push({ $sort: sortParams });
    }

    const jobs = await Job.aggregate(aggregationPipeline);

    // Respond with jobs
    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.json(jobs);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
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

//Delete The Job
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
    console.log("Category update result:", categoryUpdateResult);

    // Update Recruiter collection
    const recruiterUpdateResult = await Recruiter.updateOne(
      { userId: recruiterId },
      { $pull: { jobs: jobId } }
    );
    console.log("Recruiter update result:", recruiterUpdateResult);

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


