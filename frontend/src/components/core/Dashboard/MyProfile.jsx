import React, { useEffect } from 'react';
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from '../../common/IconBtn';
import { setApplicant, setApplicantReal } from '../../../slices/applicantSlice';
import { setRecruiter, setRecruiterReal } from '../../../slices/recruiterSlice';
import { getApplicantDetails, getRecruiterDetails } from '../../../services/operations/fetchDataAPI'; // Example API functions
import { FaDownload } from "react-icons/fa";


export default function MyProfile() {
    const { user } = useSelector((state) => state.user);
    const { jobApplicant, applicantReal } = useSelector((state) => state.jobApplicant);
    const { recruiter, recruiterReal } = useSelector((state) => state.recruiter);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.accountType === 'Applicant') {
            getApplicantDetails(user.token).then((applicantData) => {
                dispatch(setApplicant(applicantData));
                // You can also dispatch setApplicantReal here if needed
                // dispatch(setApplicantReal(applicantData));
            });
        } else if (user && user.accountType === 'Recruiter') {
            getRecruiterDetails(user.token).then((recruiterData) => {
                dispatch(setRecruiter(recruiterData));
                // You can also dispatch setRecruiterReal here if needed
                // dispatch(setRecruiterReal(recruiterData));
            });
        }
    }, [user, dispatch]);

    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                My Profile
            </h1>

            {/* Common Profile Info */}
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex items-center gap-x-4">
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover"
                    />
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-richblack-5">
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className="text-sm text-richblack-300">{user?.email}</p>
                    </div>
                </div>
                <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                >
                    <RiEditBoxLine />
                </IconBtn>
            </div>

            {/* Render different sections based on user role */}
            {user?.accountType === 'Applicant' && jobApplicant && (
                <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-lg font-semibold text-richblack-5">Applicant Details</p>
                        <IconBtn
                            text="Edit"
                            onclick={() => {
                                navigate("/dashboard/settings")
                            }}
                        >
                            <RiEditBoxLine />
                        </IconBtn>
                    </div>

                    <div>
                        <p className="mb-2 text-xl font-bold text-yellow-50">About</p>
                        <p
                        className={`${
                            jobApplicant.profile
                            ? "text-richblack-5"
                            : "text-richblack-400"
                        } text-sm font-medium`}
                        >
                        {jobApplicant.profile ?? "Write Something About Yourself"}
                        </p>
                    </div>
                    
                    <div>
                        <p className="mb-2 text-xl font-bold text-yellow-50">Education</p>
                        {Array.isArray(jobApplicant.education) && jobApplicant.education.length > 0 ? (
                            jobApplicant.education.map((edu, index) => (
                                <div key={index}>
                                    <p className="text-sm font-medium text-richblack-5">
                                        {edu.institutionName} ({edu.startYear} - {edu.endYear})
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-richblack-500">No education details available.</p>
                        )}
                    </div>
                    <div>
                        <p className="mb-2 text-xl font-bold text-yellow-50">Skills</p>
                        {Array.isArray(jobApplicant.skills) && jobApplicant.skills.length > 0 ? (
                            <p className="text-sm font-medium text-richblack-5">{jobApplicant.skills.join(', ')}</p>
                        ) : (
                            <p className="text-sm text-richblack-500">No skills listed.</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="resume" className="mb-2 text-xl font-bold text-yellow-50">
                                        Resume
                                    </label>
                                    
                                        <a
                                            href={jobApplicant.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline flex flex-row gap-4"
                                        ><FaDownload size={22} />
                                        </a>
                                </div>
                            </div>
                    
                </div>
            )}

            {user?.accountType === 'Recruiter' && recruiter && (
                <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-lg font-semibold text-richblack-5">Recruiter Details</p>
                        <IconBtn
                            text="Edit"
                            onclick={() => {
                                navigate("/dashboard/settings")
                            }}
                        >
                            <RiEditBoxLine />
                        </IconBtn>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Company</p>
                        <p className="text-sm font-medium text-richblack-5">{recruiter.company}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Position</p>
                        <p className="text-sm font-medium text-richblack-5">{recruiter.position}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">Contact Number</p>
                        <p className="text-sm font-medium text-richblack-5">{recruiter.contactNumber}</p>
                    </div>
                </div>
            )}
        </>
    );
}
