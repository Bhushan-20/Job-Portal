const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user', // Reference to User model
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    maxApplicants: {
      type: Number,
      required: true,
      min: [1, "maxApplicants should be greater than 0"],
      validate: {
        validator: Number.isInteger,
        message: "maxApplicants should be an integer",
      },
    },
    maxPositions: {
      type: Number,
      required: true,
      min: [1, "maxPositions should be greater than 0"],
      validate: {
        validator: Number.isInteger,
        message: "maxPositions should be an integer",
      },
    },
    activeApplications: {
      type: Number,
      default: 0,
      min: [0, "activeApplications should be greater than or equal to 0"],
      validate: {
        validator: Number.isInteger,
        message: "activeApplications should be an integer",
      },
    },
    acceptedCandidates: {
      type: Number,
      default: 0,
      min: [0, "acceptedCandidates should be greater than or equal to 0"],
      validate: {
        validator: Number.isInteger,
        message: "acceptedCandidates should be an integer",
      },
    },
    dateOfPosting: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.dateOfPosting;
        },
        message: "deadline should be greater than dateOfPosting",
      },
    },
    skillsets: {
      type: [String],
      default: [],
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Internship"], // Example job types
    },
    salary: {
      type: Number,
      min: [0, "Salary should be greater than or equal to 0"],
      validate: {
        validator: Number.isInteger,
        message: "Salary should be an integer",
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to Category model
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    remote: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt fields
);

module.exports = mongoose.model("Job", jobSchema);
