import {
  lessonLoading,
  lessonSuccess,
  lessonFail,
  lessonDeleted,
} from "./lessonSlice";

import ScheduleService from "../../services/schedule.service";


export const addLesson = (data) => async (dispatch) => {
  dispatch(lessonLoading());

  try {
    const result = await ScheduleService.createLesson(data);
    dispatch(lessonSuccess());
  } catch (error) {
    dispatch(lessonFail(error.message));
  }
};

export const removeLesson = (data) => async (dispatch) => {
  dispatch(lessonLoading());

  try {
    const result = await ScheduleService.deleteLesson(data);
    dispatch(lessonDeleted());
  } catch (error) {
    dispatch(lessonFail(error.message));
  }
};
