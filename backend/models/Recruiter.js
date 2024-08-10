const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user', // Ensure this matches the exact model name in your project
    },
    contactNumber: {
        type: String, // Changed to String to handle various phone number formats
        trim: true,
    },
    company: {
        type: String,
        trim: true,
    },
    position: {
        type: String,
        trim: true,
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
}, { timestamps: true });

module.exports = mongoose.model("Recruiter", recruiterSchema);
