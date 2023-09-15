import api from "./api";
import TokenService from "./token.service";

async function login(email: string, password: string) {
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
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
      //   console.log('ERR::::', err)
    });
}

const AuthService = {
  login,
};
export default AuthService;
