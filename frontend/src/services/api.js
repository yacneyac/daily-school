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
  async (config) => {
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
      return config;
    }
    
  },
  (error) => {
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
    console.log('CONFIG ->',originalConfig)

    if (originalConfig.url !== signinUrl && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          console.log('SEND REFRESH TOKEN')
          const rs = await instance.post("/auth/refresh-token", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          
          console.log('response: ', rs)
          const { accessToken } = rs.data;

          TokenService.updateSessionAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          console.log('REJECT1 ', _error)
          return Promise.reject(_error);
        }
      }
    }
    console.log('REJECT2 ', err)
    return Promise.reject(err);
  }
);
export default instance;
