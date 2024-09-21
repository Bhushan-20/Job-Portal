import { apiConnector } from "../apiconnecter";
import { toast } from "react-hot-toast";
import {applicantEndpoints} from "../apis"

const {
    RESUME_UPLOAD_API,
    APPLY_JOB_API,
    GET_APPLICATIONS,
}=applicantEndpoints;

export const uploadResume = async(token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("POST",RESUME_UPLOAD_API,{
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Failed To Upload Resume");
        }
        result = response?.data?.data;
    }
    catch(error){
        toast.error(error.response?.data?.message || "Internal Server Error");
    }
}

export const applyJob = async (jobId, sop, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            "POST",
            `${APPLY_JOB_API}/${jobId}`,
            { sop: sop },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        if (!response?.data) {
            throw new Error("Job application failed");
        }
        
        toast.success("Job Applied Successfully");
    } catch (error) {
        toast.error(error.response?.data?.message || "Internal Server Error");
    } finally {
        toast.dismiss(toastId);
    }
};

export const getApplications = async (token) => {
    let result = []
    try{
        const response = await apiConnector("GET", GET_APPLICATIONS, null, {Authorization : `Bearer ${token}`})
        if (!response.data) {
          throw new Error(response.data.message)
        }
        result = response.data.applications
    }catch(err){
        toast.error(err.response.data.message)
    }
    return result
}

