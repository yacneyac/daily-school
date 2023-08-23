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
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getUserFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logOutUser: (state) => {
      state.user = {};
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = userSlice;

export const { getUserPending, getUserSuccess, getUserFail, logOutUser } =
  actions;

export default reducer;
