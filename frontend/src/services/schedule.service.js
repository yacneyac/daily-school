import { func } from "prop-types";
import api from "./api";

const queryString = require("query-string");

async function getSchedule() {
  return api
    .get("/schedule/weeks/1")  // TODO: change week number
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
      "/schedule/weeks/1/lesson", // TODO: CHANGE THE ID!!!
      JSON.stringify(data)
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
