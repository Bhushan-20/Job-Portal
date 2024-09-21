import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getApplications } from "../../../../services/operations/applicantFeaturesAPI";
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [myApplications, setMyApplications] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    const getApplication = async () => {
        try {
            setLoading(true); // Set loading to true before fetching
            const res = await getApplications(token);
            setMyApplications(res);
        } catch (err) {
            console.error("Cannot fetch Applications", err);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        getApplication();
    }, []);

    return (
        <div className='text-white'>
            <div className="text-3xl text-richblack-50 mb-6">My Applications</div>
            {
                loading ? ( // Show spinner while loading is true
                    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            myApplications?.map((application, index) => (
                                <div 
                                    className="bg-richblack-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                                    key={index}
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
                                            Company: {application?.recruitersDetails?.company || "Unnamed Company"}
                                        </p>
                                        <p className="text-md font-medium mb-4">
                                            Salary: {application?.jobDetails?.salary || "Not specified"}
                                        </p>
                                        <p className="text-md font-medium mb-4">
                                            Applied: {application?.dateOfApplication ? new Date(application.dateOfApplication).toLocaleDateString() : "Not specified"}
                                        </p>
                                    </div>                
                                    <div 
                                        className={`text-center rounded-full py-2 mt-4 ${
                                            application?.status === 'shortlisted' 
                                            ? 'bg-green-500' 
                                            : application?.status === 'rejected' 
                                            ? 'bg-red-500' 
                                            : 'bg-richblack-700'
                                        }`}
                                    >
                                        Status: {application?.status || "Unknown Status"}
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

export default MyApplications;
