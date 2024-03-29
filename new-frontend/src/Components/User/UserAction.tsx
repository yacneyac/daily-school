import { getUserPending, getUserSuccess, getUserFail } from "./UserSlice";
// import { loginFail } from "../login/loginSlice";
// import { fetchUserProfile } from "../../api/userApi";
import UserService from "../../Services/user.service";
import { AppDispatch } from "../../types";

export const getUserProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getUserPending());

    const user = await UserService.fetchUserProfile();

    if (user) {
      console.log("LOAD USER TO REDUX");
      dispatch(getUserSuccess(user));
      return
    }

    dispatch(getUserFail("User not found!"));
  } catch (error) {
    console.log("ERR getUserProfile: ", error);
    dispatch(getUserFail(error.message));
    // dispatch(loginFail(error.message));
    // if (error.code === "ERR_NETWORK") {
    // dispatch(getUserFail(error.message));
    // } else {
    // dispatch(getUserFail(error.response.data.detail));
    // }
  }
};


// export const getUserDashboard = () => async (dispatch) => {
//   try {
//     dispatch(getUserPending());

//     const user = await fetchUserProfile();

//     if (user) {
//       console.log('LOAD USER TO REDUX')
//       return dispatch(getUserSuccess(user));
//     }

//     dispatch(getUserFail("User not found!"));

//   } catch (error) {
//     dispatch(getUserFail(error));
//   }
// };
