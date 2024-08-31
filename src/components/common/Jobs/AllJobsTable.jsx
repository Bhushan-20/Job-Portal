import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs, deleteJob, getApplicationsForJob } from "../../../services/operations/recruiterFeaturesAPI";
import { applyJob } from "../../../services/operations/applicantFeaturesAPI";

const JobsTable = ({ jobs, setJobs }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user); 

    const [loading, setLoading] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [showMoreInfo, setShowMoreInfo] = useState({}); // Track the visibility of more info for each job

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

    return (
        <>
            <Table className="rounded-xl border border-richblack-800">
                <Thead>
                    <Tr className="rounded-t-md border-b border-b-white px-6 py-2">
                        <Th className="text-left text-2xl font-bold uppercase text-yellow-100">
                            
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {jobs?.length === 0 ? (
                        <Tr>
                            <Td colSpan="2" className="py-10 text-center text-2xl font-medium text-richblack-100">
                                No Jobs found
                            </Td>
                        </Tr>
                    ) : (
                        jobs.map((job) => (
                            <Tr key={job._id} className="border-b border-richblack-800 ">
                                <Td className="flex sm:flex-col md:flex-row gap-4 p-6 sm:items-center justify-center sm:justify-center">
                                    {/* Left side - Job card */}
                                    <div className="flex-1 bg-richblack-800 shadow-lg rounded-lg p-6 text-richblack-100 max-w-sm">
                                        <h2 className="text-2xl font-bold mb-2">
                                            Role: <span className="text-xl">{job.title}</span>
                                        </h2>
                                        <p className="mb-2">Company: {job.company}</p>
                                        <p className="mb-2">
                                            Last Date to Apply: {new Date(job.deadline).toLocaleDateString()}
                                        </p>
                                        <p className="mb-2">
                                            Skills: {job.skillsets.map((skill) => (
                                                <span key={skill} className="inline-block bg-richblack-700 text-richblack-300 text-sm px-2 py-1 mr-2 rounded-lg">
                                                    {skill}
                                                </span>
                                            ))}
                                        </p>
                                        <div className="mt-4 flex justify-end">
                                            {user?.accountType === "Applicant" && (
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
                                    <div className={`flex-1 bg-richblack-700 shadow-lg rounded-lg p-6 text-richblack-100 ${showMoreInfo[job._id] ? 'block' : 'hidden'} md:block`}>
                                        <p className="mb-2">Salary: &#8377; {job.salary} per month</p>
                                        <p className="mb-2">Date Of Posting: {new Date(job.dateOfPosting).toLocaleDateString()}</p>
                                        <p className="mb-2">Number of Applicants: {job.maxApplicants}</p>
                                        <p className="mb-2">Number of Positions: {job.maxPositions}</p>
                                        <p className="mb-4">Description: {job.description}</p>
                                        <p className="mb-2">Location: {job.location}</p>
                                    </div>

                                    {/* Toggle button for small devices */}
                                    <button
                                        onClick={() => toggleMoreInfo(job._id)}
                                        className="mt-4 bg-richblack-700 justify-end text-richblack-300 rounded-lg py-2  px-4 md:hidden w-[140px]"
                                    >
                                        {showMoreInfo[job._id] ? 'Hide Info' : 'More Info'}
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </>
    );
};

export default JobsTable;
