import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    applicant: localStorage.getItem("applicant") ? JSON.parse(localStorage.getItem("applicant")) : null,
};

const applicantSlice = createSlice({
    name: "applicant",
    initialState: initialState,
    reducers: {
        setApplicant(state, action) {
            state.applicant = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setApplicant, setLoading } = applicantSlice.actions;
export default applicantSlice.reducer;
