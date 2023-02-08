import {
  lessonMarkLoading,
  lessonMarkSuccess,
  lessonMarkFail,
} from "./LessonMarkSlice";

import ScheduleService from "../../../Services/schedule.service";

export const addMark = (data) => async (dispatch) => {
  dispatch(lessonMarkLoading());

  try {
    await ScheduleService.addMark(data);
    dispatch(lessonMarkSuccess());
  } catch (error) {
    dispatch(lessonMarkFail(error.message));
  }
};

export const updateMark = (data) => async (dispatch) => {
  dispatch(lessonMarkLoading());

  try {
    await ScheduleService.updateMark(data);
    dispatch(lessonMarkSuccess());
  } catch (error) {
    dispatch(lessonMarkFail(error.message));
  }
};
