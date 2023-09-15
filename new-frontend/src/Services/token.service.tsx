import api from "./api";
import { StringOptional } from "../types";

const getLocalRefreshToken = (): StringOptional => {
  const localDS = localStorage.getItem("dailySchool");

  if (!localDS) {
    throw new Error("Parameter <dailySchool> is missed in the LocalStorage");
  }

  const { refreshToken } = JSON.parse(localDS);
  return refreshToken;
};

const getSessionAccessToken = (): StringOptional => {
  return sessionStorage.getItem("accessToken") || "";
};

const updateSessionAccessToken = (token: string) => {
  sessionStorage.setItem("accessToken", token);
  // console.log("updateSessionAccessToken - OK");
};

const updateLocalRefreshToken = (token: string) => {
  localStorage.setItem("dailySchool", JSON.stringify({ refreshToken: token }));
  // console.log("updateLocalRefreshToken - OK");
};

const removeRefreshToken = () => {
  localStorage.removeItem("dailySchool");
  // console.log("removeRefreshToken");
};

const removeAccessToken = () => {
  sessionStorage.removeItem("accessToken");
  // console.log("removeAccessToken");
};

async function fetchNewAccessJWT() {
  const refreshToken  = getLocalRefreshToken();

  if (!refreshToken) {
    throw new Error("refreshToken is not found");
  }

  return api
    .get("/auth/refresh-token", {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    })
    .then((response) => {
      console.log("fetchNewAccessJWT result: ", response);
      if (response.status === 200) {
        updateSessionAccessToken(response.data.accessToken);
      }

      return true;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

// const getUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };
// const setUser = (user) => {
//   console.log(JSON.stringify(user));
//   localStorage.setItem("user", JSON.stringify(user));
// };
// const removeUser = () => {
//   localStorage.removeItem("user");
// };
const TokenService = {
  getLocalRefreshToken,
  getSessionAccessToken,
  updateSessionAccessToken,
  updateLocalRefreshToken,
  removeRefreshToken,
  removeAccessToken,
  fetchNewAccessJWT,
  // getUser,
  // setUser,
  // removeUser,
};
export default TokenService;
