import api from "./api";

async function fetchUserProfile() {
  return api
    .get("/auth/user")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log('ERR fetchUserProfile: ', err)
      throw new Error(err);
      //   console.log('ERR::::', err)
    });
}

async function getTimeTable() {
  return api
    .get("/schedule")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
      //   console.log('ERR::::', err)
    });
}

// const getPublicContent = () => {
//   return api.get("/test/all");
// };
// const getUserBoard = () => {
//   return api.get("/me");
// };
// const getModeratorBoard = () => {
//   return api.get("/test/mod");
// };
// const getAdminBoard = () => {
//   return api.get("/test/admin");
// };
const UserService = {
  fetchUserProfile,
  getTimeTable,
  // getUserBoard,
  // getModeratorBoard,
  // getAdminBoard,
};
export default UserService;
