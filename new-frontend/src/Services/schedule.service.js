import api from "./api";

async function getSchedule(weekID) {
  if (weekID) weekID = `/${weekID}`;

  return api
    .get(`/schedule/weeks${weekID}`)
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
  return api
    .post(`/schedule/weeks/${data.week_id}/lessons`, JSON.stringify(data))
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function deleteLesson(data) {
  return api
    .delete(`/schedule/weeks/${data.week_id}/lessons/` + data.lesson_id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

// TODO: make service for teachers
async function getLesson(data) {
  console.log("getLesson DATA>: ", JSON.stringify(data));
  return api
    .get(`/teachers/${data.teacherID}/lessons/${data.lessonID}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function addMark(data) {
  console.log("addMark DATA>: ", JSON.stringify(data));
  return api
    .post(
      `/teachers/${data.teacher_id}/students/${data.student_id}/marks`,
      JSON.stringify(data)
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function updateMark(data) {
  console.log("updateMark DATA>: ", JSON.stringify(data));
  return api
    .put(
      `/teachers/${data.teacher_id}/students/${data.student_id}/marks`,
      JSON.stringify(data)
    )
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
  getLesson,
  addMark,
  updateMark,
};
export default ScheduleService;
