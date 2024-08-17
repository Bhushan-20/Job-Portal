import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobApplicant: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    applicantReal: null,
    editApplicant: null,
    loading: false,
};

const applicantSlice = createSlice({
    name: "jobApplicant",
    initialState: initialState,
    reducers: {
        setApplicant(state, action) {
            state.jobApplicant = action.payload;
        },
        setApplicantReal(state, action) {
            state.applicantReal = action.payload;
        },
        setEditApplicant(state, action) {
            state.editApplicant = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        clearApplicant(state) {
            state.jobApplicant = null;
            state.applicantReal = null;
            state.editApplicant = null; // Clear editApplicant when clearing applicant data
        },
    },
});

export const { setApplicant, setApplicantReal, setEditApplicant, setLoading, clearApplicant } = applicantSlice.actions;
export default applicantSlice.reducer;
