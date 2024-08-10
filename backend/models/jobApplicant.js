const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        education: [
            {
                institutionName: {
                    type: String,
                    required: true,
                },
                startYear: {
                    type: Number,
                    min: 1930,
                    max: new Date().getFullYear(),
                    required: true,
                    validate: Number.isInteger,
                },
                endYear: {
                    type: Number,
                    max: new Date().getFullYear(),
                    validate: [
                        { validator: Number.isInteger, msg: "Year should be an integer" },
                        {
                            validator: function (value) {
                                return this.startYear <= value;
                            },
                            msg: "End year should be greater than or equal to Start year",
                        },
                    ],
                },
            },
        ],
        skills: [String],
        resume: {
            type: String,
        },
        profile: {
            type: String,
        },
    }, { timestamps: true }
);

module.exports = mongoose.model("jobApplicant",applicantSchema);