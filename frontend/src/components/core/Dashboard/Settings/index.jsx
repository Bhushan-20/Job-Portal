import Upload from "../Recruiter/AddJob/Upload"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
  const { user } = useSelector((state) => state.user);
  const { jobApplicant, applicantReal } = useSelector((state) => state.jobApplicant);
  const {editApplicant,setEditApplicant} = useSelector((state)=>state.jobApplicant);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
} = useForm();
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Profile */}
      <EditProfile />
      {user?.accountType === "Applicant" && jobApplicant && (
                        <div>
                        <Upload
                                name="Resume"
                                label="Upload Resume"
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                editApplicant={editApplicant ? jobApplicant?.resume : null}
                            />
                        </div>
                    )}
      {/* Password */}
      <UpdatePassword />
    </>
  )
}