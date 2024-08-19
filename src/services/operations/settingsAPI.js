import { toast } from "react-hot-toast"
import { setUser } from "../../slices/userSlice"
import {setApplicant} from "../../slices/applicantSlice"
import {setRecruiter} from "../../slices/recruiterSlice"
import { apiConnector } from "../apiconnecter"
import {settingsEndpoints} from "../apis"
import {logout} from "./authAPI"

const {
    UPDATE_USER_DETAILS_API,
    CHANGE_PASSWORD_API,
    UPLOAD_RESUME_API
} = settingsEndpoints


export function updateUserDetails(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Updating user details...");

        try {
            // Log the token before making the API call

            const response = await apiConnector("POST", UPDATE_USER_DETAILS_API, formData, {
                Authorization: `Bearer ${token}`,
            });

            console.log("UPDATE_USER_DETAILS_API RESPONSE:", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const { updatedUserDetails, updatedApplicant, updatedRecruiter } = response.data;

            // Generate user image using DiceBear API
            const userImg = `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`;

            // Update user details in the Redux store
            dispatch(setUser({ ...updatedUserDetails, image: userImg }));

            // Conditionally update either applicant or recruiter details based on account type
            if (updatedUserDetails.accountType === 'Applicant') {
                dispatch(setApplicant({ ...updatedApplicant }));
            } else if (updatedUserDetails.accountType === 'Recruiter') {
                dispatch(setRecruiter({ ...updatedRecruiter }));
            }

            toast.success("User updated successfully");

            // Log the token after the API call
            console.log("Token after API call:", token);

        } catch (error) {
            console.error("Error updating user details:", error);
            toast.error(error.response?.data?.message || "Could not update profile");
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function uploadResume(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading resume...");
        try {
            const response = await apiConnector("POST", UPLOAD_RESUME_API, formData, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const { updatedApplicant } = response.data;
            dispatch(setApplicant({ ...updatedApplicant }));

            toast.success("Resume uploaded successfully");
        } catch (error) {
            console.error("Failed to upload resume:", error);
            toast.error(error.response?.data?.message || "Failed to upload resume");
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}
