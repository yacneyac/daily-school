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
  console.log('removeRefreshToken')
};
const removeAccessToken = () => {
  sessionStorage.removeItem("accessToken");
  console.log('removeAccessToken')
};

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
  // getUser,
  // setUser,
  // removeUser,
};
export default TokenService;
