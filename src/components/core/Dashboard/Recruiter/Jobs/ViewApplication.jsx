import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationsForJob,updateApplicationStatus } from "../../../../../services/operations/recruiterFeaturesAPI";
import { toast } from 'react-toastify';

const ViewApplication = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { jobId } = useParams();

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        setLoading(true);
        const result = await getApplicationsForJob(jobId, token);
        setJobApplications(result);
      } catch (error) {
        console.error("Error fetching job applications:", error);
        toast.error("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobApplications();
  }, [jobId, token]);

  const handleShortlist = async(applicationId,newStatus) => {
    const updateStatus = await updateApplicationStatus(applicationId,newStatus,token);
  };

  const handleReject = async(applicationId,newStatus) => {
    const updateStatus = await updateApplicationStatus(applicationId,newStatus,token)
  };

  if (loading) {
    return <div className="text-center text-white">Loading applications...</div>;
  }

  return (
    <div className="text-white container mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">Applications for Selected Job</h2>
      {jobApplications.length === 0 ? (
        <p>No applications found for this job.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobApplications.map((application) => (
            <div 
              key={application._id}
              className="bg-richblack-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between"
            >
              <div className="mb-4">
                <p className="text-lg font-medium mb-2">
                  Applicant: {application?.userDetails?.firstName ? `${application.userDetails.firstName} ${application.userDetails.lastName || ""}` : "No Name"}
                </p>

                <p className="text-md font-medium mb-4">
                  Education:
                  {application?.jobApplicantsDetails?.education && application.jobApplicantsDetails.education.length > 0
                    ? application.jobApplicantsDetails.education.map((edu, index) => (
                        <span key={edu._id}>
                          {edu.institutionName} ({edu.startYear} - {edu.endYear})
                          {index < application.jobApplicantsDetails.education.length - 1 && ', '}
                        </span>
                      ))
                    : "Not specified"}
                </p>
                
                <p className="text-md font-medium mb-4">
                  Applied: {application?.dateOfApplication ? new Date(application.dateOfApplication).toLocaleDateString() : "Not specified"}
                </p>

                <p className="text-md font-medium mb-4">
                  Resume: <a href={application?.jobApplicantsDetails.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {application?.jobApplicantsDetails.resume.split('/').pop()}
                  </a>
                </p>
              </div>
            <div className="flex justify-between items-center mt-auto">
                {application.status === 'shortlisted' ? (
                    <p className="text-green-500 font-semibold">Accepted</p>
                ) : application.status === 'rejected' ? (
                    <p className="text-red-500 font-semibold">Rejected</p>
                ) : (
                    <>
                    <button 
                        onClick={() => handleShortlist(application._id,'shortlisted')} 
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Shortlist
                    </button>
                    <button 
                        onClick={() => handleReject(application._id,'rejected')} 
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Reject
                    </button>
                    </>
                )}
            </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplication;
