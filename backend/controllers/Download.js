const path = require("path");
const fs = require("fs");

exports.getResumeFile = (req, res) => {
    const resumePath = path.join(__dirname, `../public/resume/${req.params.file}`);

    fs.access(resumePath, fs.F_OK, (err) => {
        if (err) {
            return res.status(404).json({
                message: "Resume file not found",
            });
        }
        res.sendFile(resumePath);
    });
};

exports.getProfileFile = (req, res) => {
    const profilePath = path.join(__dirname, `../public/profile/${req.params.file}`);

    fs.access(profilePath, fs.F_OK, (err) => {
        if (err) {
            return res.status(404).json({
                message: "Profile file not found",
            });
        }
        res.sendFile(profilePath);
    });
};
