import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recruiter: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    recruiterReal: null,
    loading: false,
};

const recruiterSlice = createSlice({
    name: "recruiter",
    initialState: initialState,
    reducers: {
        setRecruiter(state, action) {
            state.recruiter = action.payload;
        },
        setRecruiterReal(state, action) {
            state.recruiterReal = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        clearRecruiter(state) {
            state.recruiter = null;
            state.recruiterReal = null;
        },
    },
});

export const { setRecruiter, setRecruiterReal, setLoading, clearRecruiter } = recruiterSlice.actions;
export default recruiterSlice.reducer;
