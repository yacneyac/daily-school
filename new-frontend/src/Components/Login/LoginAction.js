// import { getUserPending, getUserSuccess, getUserFail } from "./userSlice";
import { loginPending, loginSuccess, loginFail } from "./LoginSlice";
// import { fetchUserProfile } from "../../api/userApi";
import AuthService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginPending());

    const navigate = useNavigate();
    const auth = await AuthService.login(email, password);

    if (auth.accessToken) {
      
      // console.log("GO TO /dashboard");
      dispatch(loginSuccess());
      navigate("/timetable");

      return true
    }

    dispatch(loginFail("User or pass is invalid!"));
  } catch (error) {
    console.log("ERR getUserProfile: ", error);
    dispatch(loginFail(error.message));
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
