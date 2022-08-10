import axios from "axios";
import TokenService from "./token.service";
import { baseUrl, signinUrl } from "./__url.const";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

instance.interceptors.request.use(
  (config) => {
    // console.log("CONFIG:", config);
    if (config.url === signinUrl) {
      return config;
    }

    const accessToken = TokenService.getSessionAccessToken();

    // const accessToken = sessionStorage.getItem("accessToken");

    if(config.url === "/auth/refresh-token"){
      config.headers["Authorization"] = "Bearer " + TokenService.getLocalRefreshToken()
      return config
    }

    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken; // for Spring Boot back-end
      //   config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log("ERROR:", err);

    const originalConfig = err.config;
    console.log(originalConfig)

    if (originalConfig.url !== signinUrl && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = instance.post("/auth/refresh-token", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;

          TokenService.updateSessionAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    console.log('REJECT!!!!!!!!!!!!!!!!')
    return Promise.reject(err);
  }
);
export default instance;
