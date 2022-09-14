import { func } from "prop-types";
import api from "./api";

const queryString = require("query-string");

async function getSchedule() {
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

async function getScheduleParameters() {
  return api
    .get("/schedule/parameters")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
      //   console.log('ERR::::', err)
    });
}


async function createLesson(data){
  console.log('DATA>: ', JSON.stringify(data))
  return api
  .post(
    "/schedule/lesson",
    // data
    // queryString.stringify(
      JSON.stringify(data)
    //   username: email,
    //   password: password,
    // )
    )
  .then((response)=>{
    return response.data;

  })
  .catch((err)=>{
    throw new Error(err);
  })

}


const ScheduleService = {
  getSchedule,
  getScheduleParameters,
  createLesson
};
export default ScheduleService;
