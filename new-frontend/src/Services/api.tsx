import axios, { AxiosRequestConfig } from "axios";
import TokenService from "./token.service";
// import { baseUrl, signinUrl } from "./__url.const";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

instance.interceptors.request.use(
   config => {
    if (config.url === "/auth/signin") {
      return config;
    }

    if (config.url === "/auth/refresh-token") {
      config.headers.Authorization =
        "Bearer " + TokenService.getLocalRefreshToken();
    }

    const accessToken = TokenService.getSessionAccessToken();

    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;

      // if (config.method === "post") {
      //   config.headers!["Content-Type"] = "application/json";
      // }

    }

    return config
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    console.log("ERROR:", err);

    const originalConfig = err.config;
    console.log("CONFIG err response ->", err.config);
    const skippUrl = ["/auth/refresh-token", "/auth/signin"];

    if (!skippUrl.includes(originalConfig.url) && err.response) {
      // Access Token was expired
      // Incorrect username or password

      if (err.response.status === 401) {

        try {
          console.log("SEND REFRESH TOKEN");
          const rs = await instance.post("/auth/refresh-token", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          console.log("response: ", rs);
          const { accessToken } = rs.data;

          TokenService.updateSessionAccessToken(accessToken);
          return instance(err.config);
        } catch (_error) {
          console.log("REJECT1 ", _error);
          // if (_error.message === 'Invalid token'){
          TokenService.removeAccessToken();
          TokenService.removeRefreshToken();
          // }

          return Promise.reject(_error);
        }
      }
    }
    console.log("REJECT2 ", err);
    if (err.code === "ERR_NETWORK") {
      return Promise.reject(err.message);
    }
    if (err.response.status === 422) {
      return Promise.reject(err.response.data.detail[0].msg);
    }
    return Promise.reject(err.response.data.detail);
    // return Promise.reject(err.message);
    // return Promise.reject(JSON.stringify(err.response.data.detail));
  }
);
export default instance;
