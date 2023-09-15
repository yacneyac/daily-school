import { LessonCreate, MarkCreate } from "../types";
import api from "./api";

async function getSchedule() {
  return api
    .get(`/schedule/weeks`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
      //   console.log('ERR::::', err)
    });
}

async function getScheduleById(weekID: number) {
  return api
    .get(`/schedule/weeks/${weekID}`)
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

async function createLesson(data: LessonCreate) {
  return api
    .post(`/schedule/weeks/${data.week_id}/lessons`, JSON.stringify(data))
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function deleteLesson(weekId: number, lessonId: number) {
  return api
    .delete(`/schedule/weeks/${weekId}/lessons/${lessonId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

// TODO: make service for teachers
async function getLesson(teacherId: number, lessonId: number) {
  // console.log("getLesson DATA>: ", JSON.stringify(data));
  return api
    .get(`/teachers/${teacherId}/lessons/${lessonId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

async function addMark(data: MarkCreate) {
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

async function updateMark(data: MarkCreate) {
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
  getScheduleById,
  getScheduleParameters,
  createLesson,
  deleteLesson,
  getLesson,
  addMark,
  updateMark,
};
export default ScheduleService;
