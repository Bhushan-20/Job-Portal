import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import jobApplicantReducer from "../slices/applicantSlice";
import recruiterReducer from "../slices/recruiterSlice";
import jobReducer from "../slices/jobSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    jobApplicant: jobApplicantReducer,
    recruiter: recruiterReducer,
    job:jobReducer,
});

export default rootReducer;
