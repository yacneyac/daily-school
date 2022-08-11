import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  week: {},
  isLoading: false,
  activeDay: "",
  error: "",
};

const timeTableSlice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {
    fetchTimeTableLoading: (state) => {
      state.isLoading = true;
      // state.activeDay = "";

    },
    fetchTimeTableSuccess: (state, action) => {
      state.week = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    fetchTimeTableFail: (state, action) => {
      state.week = {};
      state.error = action.payload;
      state.isLoading = false;
    },
    setTimeTableDay: (state, action) => {
      state.activeDay = action.payload;
    },
  },
});

const { reducer, actions } = timeTableSlice;

export const {
  fetchTimeTableLoading,
  fetchTimeTableSuccess,
  fetchTimeTableFail,
  setTimeTableDay
} = actions;

export default reducer;
