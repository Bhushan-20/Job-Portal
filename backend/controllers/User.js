const Job = require("../models/Jobs"); 
const Category = require("../models/Category");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter"); // Ensure the correct path
const jobApplicant = require("../models/jobApplicant");
const Application = require("../models/Application");
const mongoose = require('mongoose');

exports.getUserDetails = async (req, res) => {
    try {
        const user = req.user;
        const userId = req.user.id;
        let userDetails;
        if (user.accountType === 'Recruiter') {
            userDetails = await User.findById(userId);

            if (!userDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Recruiter does not exist',
                });
            }
        } else if (user.accountType === 'Applicant') {
            userDetails =  await User.findById(userId);

            if (!userDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Job applicant does not exist',
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid user type',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User Data fetched successfully',
            data: userDetails,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error fetching user details',
            error: err.message,
        });
    }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const user = req.user;
        const userId = req.user.id;
        const data = req.body;

        if (user.accountType === "Recruiter") {
            const userRec = await User.findById(userId);
            const recruiter = await Recruiter.findOne({ userId });

            if (!recruiter || !userRec) {
                return res.status(404).json({
                    success: false,
                    message: "User does not exist",
                });
            }

            // Update User details
            if (data.firstName) userRec.firstName = data.firstName;
            if (data.lastName) userRec.lastName = data.lastName;
            if (data.email) userRec.email = data.email;

            // Update Recruiter details
            if (data.contactNumber) recruiter.contactNumber = data.contactNumber;
            if (data.company) recruiter.company = data.company;
            if (data.position) recruiter.position = data.position;

            await userRec.save();
            await recruiter.save();

            return res.status(200).json({
                success: true,
                message: "User details updated successfully",
            });
        } else if (user.accountType === "Applicant") {
            const userAppli = await User.findById(userId);
            const applicant = await jobApplicant.findOne({ userId });

            if (!applicant || !userAppli) {
                return res.status(404).json({
                    success: false,
                    message: "User does not exist",
                });
            }

            // Update User details
            if (data.firstName) userAppli.firstName = data.firstName;
            if (data.lastName) userAppli.lastName = data.lastName;
            if (data.email) userAppli.email = data.email;

            // Update Applicant details
            if (data.education) applicant.education = data.education;
            if (data.skills) applicant.skills = data.skills;
            if (data.resume) applicant.resume = data.resume;
            if (data.profile) applicant.profile = data.profile;

            await userAppli.save();
            await applicant.save();

            return res.status(200).json({
                success: true,
                message: "User details updated successfully",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid user type",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update user information",
            error: error.message,
        });
    }
};

// Apply for a Job
exports.applyForJob = async (req, res) => {
    try {
        const user = req.user; // Make sure this is correctly populated by your auth middleware
        const userId = req.user.id; // Changed to use _id
        console.log("User Id->",userId);
        const jobId = req.params.id;
        const { sop } = req.body;

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated or missing user ID",
            });
        }

        if (user.accountType !== "Applicant") {
            return res.status(401).json({
                message: "You don't have permissions to apply for a job",
            });
        }

        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({
            userId: userId,
            jobId: jobId,
            status: { $nin: ["deleted", "accepted", "cancelled"] },
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
            });
        }

        // Find the job
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job does not exist",
            });
        }

        // Check if the job has reached the maximum number of applicants
        const activeApplicationCount = await Application.countDocuments({
            jobId: jobId,
            status: { $nin: ["rejected", "deleted", "cancelled", "finished"] },
        });

        if (activeApplicationCount >= job.maxApplicants) {
            return res.status(400).json({
                message: "Application limit reached",
            });
        }

        // Check if the user has fewer than 10 active applications and no accepted jobs
        const myActiveApplicationCount = await Application.countDocuments({
            userId: userId,
            status: { $nin: ["rejected", "deleted", "cancelled", "finished"] },
        });

        if (myActiveApplicationCount >= 10) {
            return res.status(400).json({
                message: "You have 10 active applications. Hence you cannot apply.",
            });
        }

        const acceptedJobs = await Application.countDocuments({
            userId: userId,
            status: "accepted",
        });

        if (acceptedJobs > 0) {
            return res.status(400).json({
                message: "You already have an accepted job. Hence you cannot apply.",
            });
        }

        // Create a new application
        const application = new Application({
            userId: userId,
            recruiterId: job.userId,
            jobId: job._id,
            status: "applied",
            sop: sop,
        });

        await application.save();

        return res.status(201).json({
            message: "Job application successful",
            application,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to apply for the job",
            error: error.message,
        });
    }
};

//Recruiter -> Get Total Applications
exports.getApplicationsForJob = async (req, res) => {
    try {
        const user = req.user;

        // Check if the user is a recruiter
        if (user.accountType !== "Recruiter") {
            return res.status(401).json({
                message: "You don't have permissions to view job applications",
            });
        }

        const jobId = req.params.id;
        const userId = req.user.id;

        // Pagination setup
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Filter and sort parameters
        let findParams = {
            jobId: jobId,
            recruiterId: userId,
        };

        if (req.query.status) {
            findParams.status = req.query.status;
        }

        let sortParams = {};
        if (req.query.sortBy) {
            const sortBy = req.query.sortBy.split(':');
            sortParams[sortBy[0]] = sortBy[1] === 'desc' ? -1 : 1;
        }

        // Retrieve applications with pagination and sorting
        const applications = await Application.find(findParams)
            .collation({ locale: "en" })
            .sort(sortParams)
            .skip(skip)
            .limit(limit);

        // Get total count of applications for pagination metadata
        const totalApplications = await Application.countDocuments(findParams);

        res.json({
            page,
            limit,
            totalApplications,
            totalPages: Math.ceil(totalApplications / limit),
            applications,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error retrieving job applications',
            error: err.message,
        });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
      const user = req.user;
      const userId = req.user.id
  
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      // Aggregation pipeline to fetch applications
      const applications = await Application.aggregate([
        {
          $lookup: {
            from: "jobapplicants", // Collection name for job applicant details
            localField: "userId",
            foreignField: "userId",
            as: "jobApplicant",
          },
        },
        { $unwind: "$jobApplicant" },
        {
          $lookup: {
            from: "jobs", // Collection name for jobs
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },
        {
          $lookup: {
            from: "recruiters", // Collection name for recruiter details
            localField: "recruiterId",
            foreignField: "userId",
            as: "recruiter",
          },
        },
        { $unwind: "$recruiter" },
        {
          $match: {
            [user.accountType === "Recruiter" ? "recruiterId" : "userId"]: userId,
          },
        },
        {
          $sort: {
            dateOfApplication: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]);
      
      const totalApplications = await Application.countDocuments({
        [user.accountType === "Recruiter" ? "recruiterId" : "userId"]: userId,
      });
  
      const totalPages = Math.ceil(totalApplications / limit);
  
      res.json({
        totalApplications,
        totalPages,
        currentPage: page,
        applications,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error fetching applications",
        error: err.message,
      });
    }
};

//Update Application Status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const user = req.user;
        const userId = req.user.id;
        const applicationId = req.params.id;
        const newStatus = req.body.status;

        // Check if user is a recruiter
        if (user.accountType === "Recruiter") {
            const application = await Application.findOne({
                _id: applicationId,
                recruiterId: userId,
            });

            if (!application) {
                return res.status(404).json({ message: "Application not found" });
            }

            const job = await Job.findOne({
                _id: application.jobId,
                userId: userId,
            });
           // const jobId = req.Job.id;

            if (!job) {
                return res.status(404).json({ message: "Job does not exist" });
            }

            if (newStatus === "accepted") {
                const activeApplicationCount = await Application.countDocuments({
                    jobId: job._id,
                    status: "accepted",
                });

                if (activeApplicationCount >= job.maxPositions) {
                    return res.status(400).json({ message: "All positions for this job are already filled" });
                }

                application.status = "accepted";
                application.dateOfJoining = req.body.dateOfJoining;

                await application.save();

                await Application.updateMany(
                    {
                        _id: { $ne: application._id },
                        userId: application.userId,
                        status: { $nin: ["rejected", "deleted", "cancelled", "accepted", "finished"] },
                    },
                    { $set: { status: "cancelled" } }
                );

                await Job.findByIdAndUpdate(job._id, {
                    $inc: { acceptedCandidates: 1 },
                });

                return res.json({ message: `Application ${newStatus} successfully` });
            } else {
                const updatedApplication = await Application.findOneAndUpdate(
                    {
                        _id: applicationId,
                        recruiterId: userId,
                        status: { $nin: ["rejected", "deleted", "cancelled"] },
                    },
                    { $set: { status: newStatus } },
                    { new: true }
                );

                if (!updatedApplication) {
                    return res.status(400).json({ message: "Application status cannot be updated" });
                }

                return res.json({ message: `Application ${newStatus} successfully` });
            }
        } else if (user.accountType === "Applicant") {
            if (newStatus === "cancelled") {
                const updatedApplication = await Application.findOneAndUpdate(
                    { _id: applicationId, userId: userId },
                    { $set: { status: newStatus } },
                    { new: true }
                );

                if (!updatedApplication) {
                    return res.status(400).json({ message: "Failed to cancel the application" });
                }

                return res.json({ message: `Application ${newStatus} successfully` });
            } else {
                return res.status(401).json({ message: "You don't have permissions to update job status" });
            }
        } else {
            return res.status(400).json({ message: "Invalid user type" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating application status", error: error.message });
    }
};

exports.getApplicantsList = async (req, res) => {
  try {
    const user = req.user;

    // Ensure the user is a recruiter
    if (user.accountType !== "Recruiter") {
      return res.status(403).json({
        message: "You are not authorized to access the applicants list",
      });
    }

    let findParams = {
      recruiterId: new mongoose.Types.ObjectId(user._id),
    };

    if (req.query.jobId) {
      findParams.jobId = new mongoose.Types.ObjectId(req.query.jobId);
    }

    if (req.query.status) {
      if (Array.isArray(req.query.status)) {
        findParams.status = { $in: req.query.status };
      } else {
        findParams.status = req.query.status;
      }
    }

    let sortParams = { _id: 1 }; // Default sorting by ID in ascending order

    if (req.query.asc) {
      if (Array.isArray(req.query.asc)) {
        req.query.asc.forEach((key) => {
          sortParams[key] = 1;
        });
      } else {
        sortParams[req.query.asc] = 1;
      }
    }

    if (req.query.desc) {
      if (Array.isArray(req.query.desc)) {
        req.query.desc.forEach((key) => {
          sortParams[key] = -1;
        });
      } else {
        sortParams[req.query.desc] = -1;
      }
    }

    const applications = await Application.aggregate([
      {
        $lookup: {
          from: "jobapplicants", // Update with correct collection name if needed
          localField: "userId",
          foreignField: "userId",
          as: "jobApplicant",
        },
      },
      { $unwind: "$jobApplicant" },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      { $match: findParams },
      { $sort: sortParams },
    ]);

    if (applications.length === 0) {
      return res.status(404).json({
        message: "No applicants found",
      });
    }

    return res.status(200).json(applications);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error retrieving applicants list",
      error: err.message,
    });
  }
};










