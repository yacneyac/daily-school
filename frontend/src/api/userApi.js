import axios from "axios";

// import api from "../services/api";
// import loginUrl
import TokenService from "../services/token.service";
// import { baseUrl, signinUrl } from "../services/url.const";


const queryString = require("query-string");
const loginUrl = "http://localhost:8000/auth/signin";
const userProfileUrl = "http://localhost:8000/auth/user";
const userLogOutUrl = "http://localhost:8000/auth/logout";
const accessTokenUrl = "http://localhost:8000/auth/refresh-token";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export const userLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(
        loginUrl,
        queryString.stringify({
          username: email,
          password: password,
        }),
        {
          headers: headers,
        }
      );

      console.log("userLogin result: ", result);

      resolve(result.data);

      if (result.status === 200) {
        const {accessToken, refreshToken} =  result.data
        TokenService.updateSessionAccessToken(accessToken)
        TokenService.updateLocalRefreshToken(refreshToken)
      }
    } catch (error) {
      console.log("userLogin ERROR: ", error);
      reject(error);
    }
  });
};

export const fetchUserProfile = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = TokenService.getSessionAccessToken()

      if (!accessToken) {
        reject("Token not found");
      }

      const result = await axios.get(userProfileUrl, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      // console.log("fetchUserProfile result: ", result);

      resolve(result.data);
    } catch (error) {
      if (error.response.statusText === "Unauthorized") {
        // TODO
        console.log("USE interceptors for Unauthorized");
        // return <Navigate to='/signin' replace />;
      }

      // console.log("fetchUserProfile ERROR: ", error);
      reject(error);
    }
  });
};

export const userLogout = async () => {
  try {
    await axios.delete({
      userLogOutUrl,
      headers: {
        Authorization: "Bearer " + TokenService.getSessionAccessToken(),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewAccessJWT = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { refreshToken } = TokenService.getLocalRefreshToken()

      if (!refreshToken) {
        reject("Token not found");
      }

      const result = await axios.get(accessTokenUrl, {
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
      });

      console.log("fetchNewAccessJWT result: ", result);

      if (result.status === 200) {
        TokenService.updateSessionAccessToken(result.data.accessToken)
        // sessionStorage.setItem("accessToken", result.data.accessToken);
      }

      resolve(true);
    } catch (error) {
      console.log("fetchNewAccessJWT ERROR: ", error)
      if (error.message === "Request failed with status code 401") {
        // localStorage.removeItem("dailySchool");
        // sessionStorage.removeItem("accessToken");
        TokenService.removeAccessToken()
        TokenService.removeRefreshToken()

      }
      // Request failed with status code 401
      // if (error.response.statusText === "Unauthorized") {
        // TODO
        // console.log("USE interceptors for Unauthorized");
        // return <Navigate to='/signin' replace />;
      // }

      // console.log("fetchUserProfile ERROR: ", error);
      reject(false);
    }
  });
};
