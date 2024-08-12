import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    userReal: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setUserReal(state, action) {
            state.userReal = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        clearUser(state) {
            state.user = null;
            state.userReal = null;
            localStorage.removeItem("user");
        },
    },
});

export const { setUser, setUserReal, setLoading, clearUser } = userSlice.actions;
export default userSlice.reducer;
