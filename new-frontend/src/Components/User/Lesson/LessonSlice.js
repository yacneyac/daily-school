import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  created: false,
  deleted: false,
  isLoading: false,
  activeLesson: {
    name: "",
    date: "",
    group: "",
    students: []
  },
  error: "",
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    lessonLoading: (state) => {
      state.isLoading = true;
    },
    lessonSelect: (state, action) => {
      state.activeLesson = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    lessonSuccess: (state) => {
      state.created = true;
      state.isLoading = false;
      state.error = "";
    },
    lessonDeleted: (state) => {
      state.deleted = true;
      state.isLoading = false;
      state.error = "";
    },
    lessonFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    lessonInit: (state) => {
      state.created = false;
      state.deleted = false;
      state.error = "";
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = lessonSlice;

export const {
  lessonLoading,
  lessonSelect,
  lessonSuccess,
  lessonDeleted,
  lessonFail,
  lessonInit,
} = actions;

export default reducer;
