import {
  lessonLoading,
  lessonSuccess,
  lessonFail,
  lessonDeleted,
  lessonSelect,
} from "./lessonSlice";

import ScheduleService from "../../services/schedule.service";

import lessons from "./lessondummy.json"


export const addLesson = (data) => async (dispatch) => {
  dispatch(lessonLoading());

  try {
    const result = await ScheduleService.createLesson(data);
    dispatch(lessonSuccess());
  } catch (error) {
    dispatch(lessonFail(error.message));
  }
};

export const fetchLesson = (data) => async (dispatch) => {
  dispatch(lessonLoading());

  try {
    console.log('fetchLesson:::', data)
    const result = await ScheduleService.getLesson(data);
    dispatch(lessonSelect(result));

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
