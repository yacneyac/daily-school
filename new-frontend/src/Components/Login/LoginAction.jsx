import { loginPending, loginSuccess, loginFail } from "./LoginSlice";
import AuthService from "../../Services/auth.service";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginPending());

    const auth = await AuthService.login(email, password);

    if (auth.accessToken) {
      dispatch(loginSuccess());
      window.location.href = "/timetable";
      return true;
    }

    dispatch(loginFail("User identification failed."));
  } catch (error) {
    console.log("ERR getUserProfile: ", error);
    dispatch(loginFail(error.message));
  }
};
