import api from "./api";
import TokenService from "./token.service";

const queryString = require("query-string");

// const register = (username, email, password) => {
//   return api.post("/auth/signup", {
//     username,
//     email,
//     password,
//   });
// };

async function login(email, password) {
  return api
    .post("/auth/signin", {
      username: email,
      password: password,
    })
    .then((response) => {
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        TokenService.updateSessionAccessToken(accessToken);
        TokenService.updateLocalRefreshToken(refreshToken);
      }
      // if (response.data.accessToken) {
      //   TokenService.setUser(response.data);
      // }
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
      //   console.log('ERR::::', err)
    });
}
// const logout = () => {
//   TokenService.removeUser();
// };
// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };
const AuthService = {
  // register,
  login,
  // logout,
  // getCurrentUser,
};
export default AuthService;
