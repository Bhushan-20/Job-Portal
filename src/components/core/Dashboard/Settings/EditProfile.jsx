import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateUserDetails } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";
import React from "react";
import Upload from '../Recruiter/AddJob/Upload';
import { FaDownload } from "react-icons/fa";




export default function EditProfile() {
    const { user } = useSelector((state) => state.user);
    const { jobApplicant, applicantReal } = useSelector((state) => state.jobApplicant);
    const { recruiter, recruiterReal } = useSelector((state) => state.recruiter);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue
    } = useForm();

    const { fields: educationFields, append, remove } = useFieldArray({
        control,
        name: "education"
    });

    // Set default values when the component mounts
    React.useEffect(() => {
        if (user?.accountType === 'Applicant' && jobApplicant) {
            setValue("education", jobApplicant.education || []);
            setValue("skills", jobApplicant.skills?.join(', ') || '');
            setValue("resume",jobApplicant.resume|| []);
        }
        if (user?.accountType === 'Recruiter' && recruiter) {
            setValue("company", recruiter.company || '');
            setValue("position", recruiter.position || '');
            setValue("contactNumber", recruiter.contactNumber || '');
        }
    }, [user, jobApplicant, recruiter, setValue]);

    const submitProfileForm = async (data) => {
        try {
            dispatch(updateUserDetails(token, data));
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.error("ERROR MESSAGE - ", error.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitProfileForm)}>
                {/* Profile Information */}
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h2>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="label-style">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter first name"
                                className="form-style"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your first name.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className="label-style">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter last name"
                                className="form-style"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                            />
                            {errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your last name.
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Conditional Fields Based on User Type */}
                    {user?.accountType === 'Applicant' && jobApplicant && (
                        <>
                        <div>
                            <div className="flex flex-col gap-5 lg:flex-col">
                                    {educationFields?.map((field, index) => (
                                        <div key={field.id} className="flex flex-col gap-5 lg:flex-row">
                                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                                <label htmlFor={`education[${index}].institutionName`} className="label-style">
                                                    Institution Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`education[${index}].institutionName`}
                                                    placeholder="Enter institution name"
                                                    className="form-style"
                                                    {...register(`education[${index}].institutionName`, { required: true })}
                                                    defaultValue={field.institutionName || ''}
                                                />
                                                {errors.education?.[index]?.institutionName && (
                                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                                        Please enter the institution name.
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2 lg:w-[24%]">
                                                <label htmlFor={`education[${index}].startYear`} className="label-style">
                                                    Start Year
                                                </label>
                                                <input
                                                    type="number"
                                                    id={`education[${index}].startYear`}
                                                    placeholder="Enter start year"
                                                    className="form-style"
                                                    {...register(`education[${index}].startYear`, { required: true })}
                                                    defaultValue={field.startYear || ''}
                                                />
                                                {errors.education?.[index]?.startYear && (
                                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                                        Please enter the start year.
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2 lg:w-[24%]">
                                                <label htmlFor={`education[${index}].endYear`} className="label-style">
                                                    End Year
                                                </label>
                                                <input
                                                    type="number"
                                                    id={`education[${index}].endYear`}
                                                    placeholder="Enter end year"
                                                    className="form-style"
                                                    {...register(`education[${index}].endYear`)}
                                                    defaultValue={field.endYear || ''}
                                                />
                                                {errors.education?.[index]?.endYear && (
                                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                                        Please enter the end year.
                                                    </span>
                                                )}
                                            </div>
                                            <button type="button" onClick={() => remove(index)} className="mt-6">
                                                <RiDeleteBin6Line size={24} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => append({ institutionName: '', startYear: '', endYear: '' })}
                                        className="text-black text-[13px] sm:text-[16px] rounded-md font-bold w-[250px] h-10 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] shadow-[2px_2px_0px_0px_rgba(255,255,255,100)]"
                                    >
                                        Add another institution
                                    </button>
                            </div>
                            <div className="flex flex-col gap-5 lg:flex-row mt-6">
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="skills" className="label-style">
                                        Skills
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        id="skills"
                                        placeholder="Enter your skills"
                                        className="form-style"
                                        {...register("skills")}
                                        defaultValue={jobApplicant?.skills?.join(', ') || ''}
                                    />
                                    {errors.skills && (
                                        <span className="-mt-1 text-[12px] text-yellow-100">
                                            Please enter your skills.
                                        </span>
                                    )}
                                </div>
                            </div>
                                <div className="flex flex-col gap-5 lg:flex-row mt-6">
                                    <div className="flex flex-col gap-2 lg:w-[48%]">
                                        <label htmlFor="skills" className="label-style">
                                            About
                                        </label>
                                        <input
                                            type="text"
                                            name="profile"
                                            id="profile"
                                            placeholder="Enter profile"
                                            className="form-style"
                                            {...register("profile")}
                                            defaultValue={jobApplicant?.profile}
                                        />
                                        {errors.profile && (
                                            <span className="-mt-1 text-[12px] text-yellow-100">
                                                Please enter Profile.
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5 lg:flex-row mt-6">
                                    <div className="flex flex-col gap-2 lg:w-[48%]">
                                        <label htmlFor="resume" className="label-style">
                                            Resume
                                        </label>
                                        {jobApplicant?.resume ? (
                                            <p className="text-richblack-200">
                                                Uploaded File: <a href={jobApplicant.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                {jobApplicant.resume.split('/').pop()}
                                                </a>
                                            </p>
                                                

                                        
                                        ) : (
                                            <input
                                                type="text"
                                                name="resume"
                                                id="resume"
                                                placeholder="Enter profile"
                                                className="form-style"
                                                {...register("resume")}
                                                defaultValue={jobApplicant?.resume}
                                            />
                                        )}
                                        {errors.resume && (
                                            <span className="-mt-1 text-[12px] text-yellow-100">
                                                Please enter a valid resume link.
                                            </span>
                                        )}
                                    </div>
                            </div>

                        </div>
                        </>
                    )}

                    {user?.accountType === 'Recruiter' && recruiter && (
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="company" className="label-style">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    placeholder="Enter company name"
                                    className="form-style"
                                    {...register("company")}
                                    defaultValue={recruiter?.company || ''}
                                />
                                {errors.company && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please enter your company name.
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="position" className="label-style">
                                    Position
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    id="position"
                                    placeholder="Enter your position"
                                    className="form-style"
                                    {...register("position")}
                                    defaultValue={recruiter?.position || ''}
                                />
                                {errors.position && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please enter your position.
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="contactNumber" className="label-style">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    id="contactNumber"
                                    placeholder="Enter Contact Number"
                                    className="form-style"
                                    {...register("contactNumber", {
                                        required: {
                                            value: true,
                                            message: "Please enter your Contact Number.",
                                        },
                                        maxLength: { value: 12, message: "Invalid Contact Number" },
                                        minLength: { value: 10, message: "Invalid Contact Number" },
                                    })}
                                    defaultValue={recruiter?.contactNumber}
                                />
                                {errors.contactNumber && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        {errors.contactNumber.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/my-profile")}
                        className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </>
    );
}
