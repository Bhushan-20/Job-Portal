import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getAllJobs, deleteJob, getApplicationsForJob } from "../../../../../services/operations/recruiterFeaturesAPI";
import { FaBuilding, FaMoneyBillWave, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import ConfirmationModal from "../../../../common/ConfirmationModal";

const JobsTable = ({ job, setJob }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleJobDelete = async (jobId) => {
        setLoading(true);
        try {
            await deleteJob(jobId, token); 
            const result = await getAllJobs(token);
            if (result) {
                setJob(result);
            }
        } catch (error) {
            console.error("Failed to delete job:", error);
        } finally {
            setConfirmationModal(null);
            setLoading(false);
        }
    };

    const handleViewApplications = async (jobId) => {
        try {
            await getApplicationsForJob(jobId, token);
            navigate(`/dashboard/job/applications/${jobId}`);
        } catch (error) {
            console.error("Failed to fetch job applications:", error);
        }
    };

    return (
        <div className="p-6">
            {job?.length === 0 ? (
                <div className="text-center text-2xl font-medium text-richblack-100">No Jobs found</div>
            ) : (
                job.map((job) => (
                    <div
                        key={job._id}
                        className="flex justify-between items-center bg-richblack-800 shadow-lg rounded-lg p-6 mb-6 max-w-4xl mx-auto text-richblack-100 border-l-4 border-yellow-400"
                    >
                        {/* Job Information */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-extrabold mb-2 text-yellow-400">{job.title}</h2>
                            <p className="text-lg font-semibold flex items-center gap-2">
                                <FaBuilding className="text-yellow-300" /> {job.company}
                            </p>
                            <p className="text-lg flex items-center gap-2 mt-2">
                                <FaMoneyBillWave className="text-green-400" /> &#8377; {job.salary} per month
                            </p>
                            <p className="text-lg flex items-center gap-2 mt-2">
                                <FaCalendarAlt className="text-blue-400" /> Posted: {new Date(job.dateOfPosting).toLocaleDateString()}
                            </p>
                            <p className="text-lg flex items-center gap-2 mt-2">
                                <FaCalendarAlt className="text-red-400" /> Deadline: {new Date(job.deadline).toLocaleDateString()}
                            </p>
                            <p className="text-lg flex items-center gap-2 mt-2">
                                <FaMapMarkerAlt className="text-orange-400" /> Location: {job.location}
                            </p>
                            <p className="text-lg mt-2">
                                <span className="font-semibold">Number of Applicants:</span> {job.maxApplicants}
                            </p>
                            <p className="text-lg mt-2">
                                <span className="font-semibold">Positions Available:</span> {job.maxPositions}
                            </p>
                            <p className="mt-4">
                                <span className="font-semibold">Skills Required:</span>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {job.skillsets.map((skill) => (
                                        <span
                                            key={skill}
                                            className="bg-richblack-700 text-richblack-300 text-sm px-2 py-1 rounded-lg shadow-inner"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </p>
                            <p className="mt-4 text-md text-gray-300">
                                <span className="font-semibold">Job Description:</span> {job.description}
                            </p>
                        </div>

                        {/* Actions Section */}
                        <div className="flex flex-col items-end gap-4">
                            <button
                                onClick={() => handleViewApplications(job._id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-lg transition duration-300"
                            >
                                View Applications
                            </button>
                            <button
                                onClick={() => navigate(`/dashboard/edit-job/${job._id}`)}
                                className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-lg transition duration-300"
                            >
                                <FiEdit2 size={20} />
                                Edit
                            </button>
                            <button
                                disabled={loading}
                                onClick={() => {
                                    setConfirmationModal({
                                        text1: "Do you want to delete this job?",
                                        text2: "All the data related to this job will be deleted.",
                                        btn1Text: !loading ? "Delete" : "Loading...",
                                        btn2Text: "Cancel",
                                        btn1Handler: !loading ? () => handleJobDelete(job._id) : () => {},
                                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                                    });
                                }}
                                className="flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-lg transition duration-300"
                            >
                                <RiDeleteBin6Line size={20} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default JobsTable;
