import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  job: null,
  editJobs:false,
  loading: false,
  error: null,
}

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.job = action.payload
    },
    setEditJobs: (state, action) => {
      state.editJobs = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    resetJobState: (state) => {
      state.jobs = []
      state.job = null
      state.loading = false
      state.error = null
    },
  },
})

export const {
  setJob,
  setEditJobs,
  setLoading,
  setError,
  resetJobState,
} = jobSlice.actions

export default jobSlice.reducer
