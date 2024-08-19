import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  application: null,
  editApplication: false,
  loading: false,
}

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setApplication: (state, action) => {
      state.application = action.payload
    },
    setEditApplication: (state, action) => {
      state.editApplication = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    resetApplicationState: (state) => {
      state.step = 1
      state.application = null
      state.editApplication = false
      state.loading = false
    },
  },
})

export const {
  setStep,
  setApplication,
  setEditApplication,
  setLoading,
  resetApplicationState,
} = applicationSlice.actions

export default applicationSlice.reducer
