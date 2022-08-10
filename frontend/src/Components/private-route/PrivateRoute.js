import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../login/loginSlice";
import { fetchNewAccessJWT } from "../../api/userApi";

// https://github.com/Chinwike1/redux-user-auth/blob/main/frontend/src/routing/ProtectedRoute.js
function PrivateRoute() {
  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log('PrivateRoute ', user, isAuth)

  // automatically authenticate user if token is found
  useEffect(() => {
    const updateAccessJWT = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(loginSuccess());
    };

    // updateAccessJWT();

    // !user._id && dispatch(getUserProfile());

    !sessionStorage.getItem("accessToken") &&
      localStorage.getItem("dailySchool") &&
      updateAccessJWT();

    !isAuth &&
      sessionStorage.getItem("accessToken") &&
      dispatch(loginSuccess());

    // if (!isAuth && sessionStorage.getItem("accessToken")) {
    //   dispatch(loginSuccess());
    // }
  }, [isAuth, dispatch]);

  if (!isAuth && !sessionStorage.getItem("accessToken")) {
    console.log("REDIRECT to signin");
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
