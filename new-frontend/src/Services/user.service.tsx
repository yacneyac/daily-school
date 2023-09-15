import api from "./api";

async function fetchUserProfile() {
  return api
    .get("/auth/user")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("ERR fetchUserProfile: ", err);
      throw new Error(err);
      //   console.log('ERR::::', err)
    });
}

async function fetchTimeTable() {
  return api
    .get("/timetable")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
      //   console.log('ERR::::', err)
    });
}

const UserService = {
  fetchUserProfile,
  fetchTimeTable,

};
export default UserService;
