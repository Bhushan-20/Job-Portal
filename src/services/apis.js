const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

//USER ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/userDetails",
  GET_USER_APPLIED_JOBS_API: BASE_URL + "/profile/applications",
  GET_USER_JOBS: BASE_URL + "/profile/getAllJobs"
}

//JOBS ENDPOINTS
export const jobEndpoints = {
  GET_ALL_JOBS_API: BASE_URL + "/jobs/getAllJobs",
  JOB_DETAILS_API: BASE_URL + "/jobs/getJob/:id",
  EDIT_JOB_API: BASE_URL + "/jobs/updateJob",
  CREATE_JOB_API: BASE_URL + "/jobs/createJob",
  DELETE_JOB_API: BASE_URL + "/jobs/deleteJob",
  VIEW_APPLICATIONS_API: BASE_URL + "/auth/jobs/applications",
  //UPDATE_APPLICATION_STATUS_API: BASE_URL + "/job/updateapplication/:id",
  GET_ALL_JOBS_APPLI_API: BASE_URL + "/jobs/alljobs",
  GET_FULL_JOB_DETAILS_API:BASE_URL + "/jobs/getFullJobDetails",
  
}

// CATEGORIES API
export const allcategories = {
  CATEGORIES_API: BASE_URL + "/jobs/showAllCategories",
  CATEGORY_PAGE_DETAILS:BASE_URL + "/jobs/categoryPageDetails/"
}

// SETTINGS API
export const settingsEndpoints = {
  UPDATE_USER_DETAILS_API: BASE_URL + "/auth/updateUserDetails",
  CHANGE_PASSWORD_API : BASE_URL + "/auth/changepassword",
  UPLOAD_RESUME_API : BASE_URL + "/upload/uploadResume"
}

export const recruiterEndpoints = {
  GET_APPLICATIONS_FOR_JOB: (jobId) => BASE_URL + `/auth/jobs/${jobId}/applications`,
};

// APPLICANTS & RECRUITER API
export const applicantEndpoints = {
  RESUME_UPLOAD_API: BASE_URL + "/uploadResume",
  GET_APPLICANT_DETAILS: BASE_URL + "/auth/applicantDetails",
  GET_RECRUITER_DETAILS: BASE_URL + "/auth/recruiterDetails",
  APPLY_JOB_API:BASE_URL + "/jobs/apply",
  GET_APPLICATIONS:BASE_URL + "/auth/applications",
  UPDATE_APPLICATION_STATUS_API : BASE_URL + "/auth/updateapplicationstatus"
}



