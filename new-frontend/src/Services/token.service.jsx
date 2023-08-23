import api from "./api";

const getLocalRefreshToken = () => {
  const { refreshToken } = JSON.parse(localStorage.getItem("dailySchool"));
  return refreshToken;
};

const getSessionAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

const updateSessionAccessToken = (token) => {
  sessionStorage.setItem("accessToken", token);
  console.log("updateSessionAccessToken - OK");
};

const updateLocalRefreshToken = (token) => {
  localStorage.setItem("dailySchool", JSON.stringify({ refreshToken: token }));
  console.log("updateLocalRefreshToken - OK");
};

const removeRefreshToken = () => {
  localStorage.removeItem("dailySchool");
  console.log("removeRefreshToken");
};
const removeAccessToken = () => {
  sessionStorage.removeItem("accessToken");
  console.log("removeAccessToken");
};

async function fetchNewAccessJWT() {
  const { refreshToken } = getLocalRefreshToken();

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
        // sessionStorage.setItem("accessToken", result.data.accessToken);
      }

      return true;
    })
    .catch((err) => {
      throw new Error(err);
      //   console.log('ERR::::', err)
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
  fetchNewAccessJWT
  // getUser,
  // setUser,
  // removeUser,
};
export default TokenService;
