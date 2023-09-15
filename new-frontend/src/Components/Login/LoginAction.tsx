import { loginPending, loginSuccess, loginFail } from "./LoginSlice";
import AuthService from "../../Services/auth.service";
import { AppDispatch } from "../../types";

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginPending());

      const auth = await AuthService.login(email, password);

      if (auth.accessToken) {
        dispatch(loginSuccess());
        window.location.href = "/timetable";
        return;
      }

      dispatch(loginFail("User identification failed."));
    } catch (error) {
      console.log("ERR getUserProfile: ", error);
      dispatch(loginFail(error.message));
    }
  };
