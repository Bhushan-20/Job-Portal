import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getApplications } from "../../../../services/operations/applicantFeaturesAPI";
import {updateApplicationStatus} from "../../../../services/operations/recruiterFeaturesAPI"
import { useNavigate } from 'react-router-dom';

const Applications = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [myApplications, setMyApplications] = useState(null);

    const getApplication = async () => {
        try {
            const res = await getApplications(token);
            console.log("RES->",res);
            setMyApplications(res);
        } catch (err) {
            console.log("Cannot fetch Applications", err);
        }
    };

    useEffect(() => {
        getApplication();
    }, []);

    const handleShortlist = async(applicationId,newStatus) => {
        console.log("Token->>>>>>",token);
        const updateStatus = await updateApplicationStatus(applicationId,newStatus,token);
        console.log("UpdatedStatus",updateStatus);
      };

      const handleReject = async(applicationId,newStatus) => {
        console.log("Application Id->>>>>>>>>>",applicationId);
        const updateStatus = await updateApplicationStatus(applicationId,newStatus,token)
      };

    return (
        <div className='text-white'>
            <div className="text-3xl text-richblack-50 mb-6">All Applications</div>
            {
                !myApplications ? (
                    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            myApplications.map((application, index) => (
                                <div 
                                    className="bg-richblack-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                                    key={index}
                                    style={{ width: '100%' }}
                                >
                                    <div className="cursor-pointer" 
                                        onClick={() => {
                                            navigate(`/job/${application?.jobId}`);
                                        }}
                                    >
                                        <p className="text-xl font-semibold mb-2">
                                            {application?.jobDetails?.title || "Unnamed Job"}
                                        </p>
                                        <p className="text-md font-medium mb-2">
                                            Applicant: {application?.userDetails?.firstName ? `${application.userDetails.firstName} ${application.userDetails.lastName || ""}` : "No Name"}
                                        </p>

                                        {/* <p className="text-md font-medium mb-4">
                                            Education: 
                                            {application?.jobApplicantsDetails?.education && application.jobApplicantsDetails.education.length > 0
                                                ? application.jobApplicantsDetails.education.map((edu, index) => (
                                                    <span key={edu._id}>
                                                        {edu.institutionName} ({edu.startYear} - {edu.endYear})
                                                        {index < application.jobApplicantsDetails.education.length - 1 && ', '}
                                                    </span>
                                                ))
                                                : "Not specified"
                                            }
                                        </p> */}

                                        <p className="text-md font-medium mb-4">
                                            Applied: {application?.dateOfApplication ? new Date(application.dateOfApplication).toLocaleDateString() : "Not specified"}
                                        </p>

                                        <p className="text-md font-medium mb-2">
                                            Resume: <a href={application?.jobApplicantsDetails.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                {application?.jobApplicantsDetails.resume.split('/').pop()} </a>
                                        </p>
                                    </div>
                                    <div className="flex justify-between mt-4">
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
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Applications;
