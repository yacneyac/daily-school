import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  created: false,
  isLoading: false,
  error: "",
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    lessonLoading: (state) => {
      state.isLoading = true;
    },
    lessonSuccess: (state) => {
      state.created = true;
      state.isLoading = false;
      state.error = "";
    },
    lessonFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    lessonInit: (state) => {
      state.created = false;
      state.error = "";
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = lessonSlice;

export const { lessonLoading, lessonSuccess, lessonFail, lessonInit } = actions;

export default reducer;
