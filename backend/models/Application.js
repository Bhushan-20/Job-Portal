const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user', // Ensure this matches the exact model name in your project
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Recruiter', // Ensure this matches the exact model name in your project
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Job', // Ensure this matches the exact model name in your project
    },
    status: {
      type: String,
      enum: [
        "applied",     // when an applicant has applied
        "shortlisted", // when an applicant is shortlisted
        "accepted",    // when an applicant is accepted
        "rejected",    // when an applicant is rejected
        "deleted",     // when the job is deleted
        "cancelled",   // when an application is cancelled by its author or when another application is accepted
        "finished"     // when the job is over
      ],
      default: "applied",
      required: true,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    },
    dateOfJoining: {
      type: Date,
      validate: {
        validator: function (value) {
          return this.dateOfApplication <= value;
        },
        message: "dateOfJoining should be greater than dateOfApplication",
      },
    },
    sop: {
      type: String,
      validate: {
        validator: function (v) {
          return v.split(/\s+/).length <= 250; // Split by whitespace to count words
        },
        message: "Statement of purpose should not exceed 250 words",
      },
    },
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt fields
);

module.exports = mongoose.model("Application", applicationSchema);
