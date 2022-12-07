import axios from "axios";

// const queryString = require("query-string");
const timeTableUrl = "http://localhost:8000/auth/timetable";
// const userProfileUrl = "http://localhost:8000/auth/user";
// const userLogOutUrl = "http://localhost:8000/auth/logout";
// const accessTokenUrl = "http://localhost:8000/auth/refresh-token";

// const headers = {
//   "Content-Type": "application/x-www-form-urlencoded",
// };

export const getTimeTable = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        reject("Token not found");
      }

      const result = await axios.get(timeTableUrl, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      console.log("getTimeTable result: ", result);

      resolve(result.data);
    } catch (error) {
      if (error.response.statusText === "Unauthorized") {
        // TODO
        console.log("USE interceptors for Unauthorized");
        // return <Navigate to='/signin' replace />;
      }

      console.log("getTimeTable ERROR: ", error);
      reject(error);
    }
  });
};
