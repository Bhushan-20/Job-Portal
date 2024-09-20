import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyJob } from "../../../services/operations/applicantFeaturesAPI";

const JobsTable = ({ jobs, setJobs }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState({}); // Track visibility of more info for each job

    const handleApply = async (jobId) => {
        const sop = "This is my statement of purpose"; // Replace with actual SOP
        try {
            await applyJob(jobId, sop, token);
        } catch (error) {
            console.error("Failed to apply for job:", error);
        }
    };

    const toggleMoreInfo = (jobId) => {
        setShowMoreInfo((prevState) => ({
            ...prevState,
            [jobId]: !prevState[jobId],
        }));
    };

    const hasDeadlinePassed = (deadline) => {
        return new Date(deadline) < new Date();
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full rounded-xl border border-richblack-800">
                <thead>
                    <tr className="rounded-t-md border-b border-b-white">
                        <th className="text-left text-2xl font-bold uppercase text-yellow-100 p-4">
                            Job Listings
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {jobs?.length === 0 ? (
                        <tr>
                            <td colSpan="2" className="py-10 text-center text-2xl font-medium text-richblack-100">
                                No Jobs found
                            </td>
                        </tr>
                    ) : (
                        jobs.map((job) => (
                            <tr key={job._id} className="border-b border-richblack-800">
                                <td className="p-6 flex flex-col sm:flex-row gap-4 items-center">
                                    {/* Left side - Job card */}
                                    <div className="flex-1 bg-richblack-800 shadow-lg rounded-lg p-6 text-richblack-100 max-w-sm">
                                        <h2 className="text-2xl font-bold mb-2">
                                            Role: <span className="text-xl">{job.title}</span>
                                        </h2>
                                        <p className="mb-2"><span className="font-bold">Company:</span> {job.company}</p>
                                        <p className="mb-2"><span className="font-bold">Job Type:</span> {job.jobType}</p>
                                        <p className="mb-2 skills-container">
                                            <span className="font-bold">Skills:</span> {job.skillsets.map((skill) => (
                                                <span key={skill} className="inline-block skill bg-richblack-700 text-richblack-300 text-sm px-2 py-1 mr-2 rounded-lg">
                                                    {skill}
                                                </span>
                                            ))}
                                        </p>
                                        <p className="mb-2 font-bold" style={{ color: hasDeadlinePassed(job.deadline) ? 'red' : 'inherit' }}>
                                            {hasDeadlinePassed(job.deadline) ? (
                                                "No longer accepting applications"
                                            ) : (
                                                `Last Date to Apply: ${new Date(job.deadline).toLocaleDateString()}`
                                            )}
                                        </p>
                                        <div className="mt-4 flex justify-end">
                                            {user?.accountType === "Applicant" && !hasDeadlinePassed(job.deadline) && (
                                                <button
                                                    onClick={() => handleApply(job._id)}
                                                    className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer rounded-md py-2 px-6 font-semibold text-richblack-900"
                                                >
                                                    Apply
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right side - Other details (hidden on small screens) */}
                                    <div className={`flex-1 bg-richblack-100 shadow-lg rounded-lg p-6 text-richblack-800 ${showMoreInfo[job._id] ? 'block' : 'hidden'} md:block`}>
                                        <p className="mb-2"><span className="font-bold text-black text-lg">Salary:</span> &#8377; {job.salary} per month</p>
                                        <p className="mb-2"><span className="font-bold text-black text-lg">Date of Posting:</span> {new Date(job.dateOfPosting).toLocaleDateString()}</p>
                                        <p className="mb-2"><span className="font-bold text-black text-lg">Max Applications:</span> {job.maxApplicants}</p>
                                        <p className="mb-2"><span className="font-bold text-black text-lg">Number of Positions:</span> {job.maxPositions}</p>
                                        <p className="mb-4"><span className="font-bold text-black text-lg">Description:</span> {job.description}</p>
                                        <p className="mb-2"><span className="font-bold text-black text-lg">Location:</span> {job.location}</p>
                                    </div>

                                    {/* Toggle button for small devices */}
                                    <button
                                        onClick={() => toggleMoreInfo(job._id)}
                                        className="mt-4 bg-richblack-700 justify-end text-richblack-300 rounded-lg py-2 px-4 md:hidden w-[140px]"
                                    >
                                        {showMoreInfo[job._id] ? 'Hide Info' : 'More Info'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default JobsTable;
