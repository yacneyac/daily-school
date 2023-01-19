import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  week: {},
  parameters: [],
  activeWeekNumber: "",
  isLoading: false,
  error: "",
};

const timeTableSlice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {
    fetchTimeTableLoading: (state) => {
      state.isLoading = true;
    },
    fetchTimeTableSuccess: (state, action) => {
      state.week = action.payload.schedule;
      state.activeWeekNumber = action.payload.activeWeekNumber;
      state.isLoading = false;
      state.error = "";
    },
    fetchTimeTableParametersSuccess: (state, action) => {
      state.parameters = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    fetchTimeTableFail: (state, action) => {
      state.week = {};
      state.error = action.payload;
      state.isLoading = false;
    },
    // activeWeekNumber: (state) => state.activeWeekNumber
  },
});

const { reducer, actions } = timeTableSlice;

export const {
  fetchTimeTableLoading,
  fetchTimeTableSuccess,
  fetchTimeTableParametersSuccess,
  fetchTimeTableFail,
  // activeWeekNumber
} = actions;

export default reducer;
