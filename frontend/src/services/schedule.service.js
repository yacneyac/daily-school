import api from "./api";

async function getSchedule(week_id) {
  if (week_id) {
    week_id = "/" + week_id;
  }
  return api
    .get("/schedule/weeks" + week_id)
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

async function createLesson(data) {
  console.log("DATA>: ", JSON.stringify(data));
  return api
    .post("/schedule/weeks/" + data.week_id + "/lessons", JSON.stringify(data))
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function deleteLesson(data) {
  console.log("deleteLesson DATA>: ", JSON.stringify(data));
  return api
    .delete("/schedule/weeks/" + data.week_id + "/lessons/" + data.lesson_id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

const ScheduleService = {
  getSchedule,
  getScheduleParameters,
  createLesson,
  deleteLesson,
};
export default ScheduleService;
