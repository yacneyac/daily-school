import { createSlice } from "@reduxjs/toolkit";
import { TimeTableState } from "../../../types";

const initialState: TimeTableState = {
  week: [],
  parameters: {
    room: [],
    subject: [],
    time: [],
    group: [],
    week: [],
  },
  activeWeekNumber: null,
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
      state.week = [];
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = timeTableSlice;

export const {
  fetchTimeTableLoading,
  fetchTimeTableSuccess,
  fetchTimeTableParametersSuccess,
  fetchTimeTableFail,
} = actions;

export default reducer;
