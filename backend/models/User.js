const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		// Define the email field with type String, required, and trimmed
		email: {
			type: String,
			required: true,
			trim: true,
		},
        password: {
			type: String,
			required: true,
		},
        // Define the role field with type String and enum values of "Applicant", "Recruiter"
		accountType: {
			type: String,
			enum: ["Admin","Applicant", "Recruiter"],
			required: true,
		},
        token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
			required: true,
		},
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);