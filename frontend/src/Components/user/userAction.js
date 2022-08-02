import axios from "axios";
import { fetchUserLoading, fetchUserSuccess, fetchUserFail } from "./userSlice";

export const fetchUser = () => async (dispatch) => {
  dispatch(fetchUserLoading());

  try {
    const result = await axios.get("teacher");

    dispatch(fetchUserSuccess());
  } catch (error) {
    dispatch(fetchUserFail(error.message));
  }
};
