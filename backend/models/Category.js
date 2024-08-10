const mongoose = require("mongoose");

const jobCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure category names are unique
    },
    description: {
      type: String,
      trim: true,
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt fields
);


module.exports = mongoose.model("JobCategory", jobCategorySchema);
