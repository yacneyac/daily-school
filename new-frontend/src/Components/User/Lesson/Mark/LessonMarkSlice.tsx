import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updated: false,
  isLoading: false,
  error: "",
};

const lessonMarkSlice = createSlice({
  name: "lessonMark",
  initialState,
  reducers: {
    lessonMarkLoading: (state) => {
      state.isLoading = true;
    },
    lessonMarkSuccess: (state) => {
      state.updated = true;
      state.isLoading = false;
      state.error = "";
    },
    lessonMarkFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    lessonMarkInit: (state) => {
      state.updated = false;
      state.error = "";
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = lessonMarkSlice;

export const {
  lessonMarkLoading,
  lessonMarkSuccess,
  lessonMarkFail,
  lessonMarkInit,
} = actions;

export default reducer;
