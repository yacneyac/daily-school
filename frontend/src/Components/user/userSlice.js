import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserLoading: (state) => {
      state.isLoading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    fetchUserFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = userSlice;

export const { fetchUserLoading, fetchUserSuccess, fetchUserFail } = actions;

export default reducer;
