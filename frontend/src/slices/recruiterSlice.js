import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recruiter: localStorage.getItem("recruiter") ? JSON.parse(localStorage.getItem("recruiter")) : null,
};

const recruiterSlice = createSlice({
    name: "recruiter",
    initialState: initialState,
    reducers: {
        setRecruiter(state, action) {
            state.recruiter = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setRecruiter, setLoading } = recruiterSlice.actions;
export default recruiterSlice.reducer;
