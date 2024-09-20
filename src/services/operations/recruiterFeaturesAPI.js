import { apiConnector } from "../apiconnecter";
import { toast } from "react-hot-toast";
import { jobEndpoints,applicantEndpoints } from "../apis"; 

const {
    GET_ALL_JOBS_API,
    GET_ALL_JOBS_APPLI_API,
    JOB_DETAILS_API,
    EDIT_JOB_API,
    CREATE_JOB_API,
    DELETE_JOB_API,
    GET_FULL_JOB_DETAILS_API,
    VIEW_APPLICATIONS_API,
    
} = jobEndpoints;

const {UPDATE_APPLICATION_STATUS_API} = applicantEndpoints

export const getAllJobs = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_JOBS_API, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Jobs");
        }
        result = response?.data?.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Internal Server Error");
    }
    toast.dismiss(toastId);
    return result;
};

export const getAllJobsApplicant = async (token) => {
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_JOBS_APPLI_API, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Jobs");
        }
        result = response?.data?.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Internal Server Error");
    }
    return result;
};

export const deleteJob = async (jobId, token) => {
    const toastId = toast.loading("Loading...");
    try {
        // Ensure the jobId is passed correctly to the endpoint
        const response = await apiConnector("DELETE", `${DELETE_JOB_API}/${jobId}`, null, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error("Job Not Deleted");
        }
        toast.success("Job Deleted");
    } catch (error) {
        toast.error(error.response?.data?.message || "Internal Server Error");
    } finally {
        toast.dismiss(toastId);
    }
};

export const getApplicationsForJob = async (jobId, token) => {
    const toastId = toast.loading("Loading...");
    let applications = [];
    try {
        const response = await apiConnector("GET", `${VIEW_APPLICATIONS_API}/${jobId}`, null, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data) {
            throw new Error("No Applications Found");
        }
        toast.success("Applications Fetched Successfully");
        applications = response?.data?.applications; // Ensure data is correctly structured
    } catch (error) {
        toast.error(error.response?.data?.message || "Applications Not Fetched Successfully");
    }
    toast.dismiss(toastId);
    return applications;
};

export const updateJob = async (jobId, jobData, token) => {
    const toastId = toast.loading("Loading...");
    let updatedJob = null;
    try {
        const response = await apiConnector("PUT", `${EDIT_JOB_API}/${jobId}`, jobData, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error("Job Not Updated");
        }
        toast.success("Job Updated Successfully");
        updatedJob = response?.data?.data; // Return updated job details
    } catch (error) {
        toast.error(error.response?.data?.message || "Internal Server Error");
    }
    toast.dismiss(toastId);
    return updatedJob;
};

export const createJob = async(jobData,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", CREATE_JOB_API, jobData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        if (!response?.data?.success) {
            throw new Error("Failed To create Job")
          }
          toast.success("Job Added Successfully")
          result = response?.data?.date
    }
    catch (error) {
        toast.error(error.response.data.message)
      }
      toast.dismiss(toastId)
      return result
}

export const getFullDetailsOfJob = async(jobId,token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try{
        const response = await apiConnector("POST",GET_FULL_JOB_DETAILS_API,{jobId},
            {Authorization: `Bearer ${token}`,}
        )
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    }
    catch (error) {
        result = error.response.data
      }
    toast.dismiss(toastId)
    return result
}

export const updateApplicationStatus = async (applicationId, newStatus, token) => {
    const toastId = toast.loading("Updating application...");
    let updatedStatus = null;
    try {
      const response = await apiConnector(
        "PUT",
        `${UPDATE_APPLICATION_STATUS_API}/${applicationId}`,
        { status: newStatus },
        { Authorization: `Bearer ${token}` }
      );

  
      if (response && response.data) {
        toast.success(`Application status updated to ${newStatus}`);
        updatedStatus = newStatus;
      } else {
        toast.error("Unexpected API response");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error updating application status:", error);
    }
    toast.dismiss(toastId);
    return updatedStatus;
  };

