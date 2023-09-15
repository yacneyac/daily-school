import {
  lessonMarkLoading,
  lessonMarkSuccess,
  lessonMarkFail,
} from "./LessonMarkSlice";

import ScheduleService from "../../../../Services/schedule.service";
import { AppDispatch, MarkCreate } from "../../../../types";

export const addMark = (data: MarkCreate) => async (dispatch: AppDispatch) => {
  dispatch(lessonMarkLoading());

  try {
    await ScheduleService.addMark(data);
    dispatch(lessonMarkSuccess());
  } catch (error) {
    dispatch(lessonMarkFail(error.message));
  }
};

export const updateMark =
  (data: MarkCreate) => async (dispatch: AppDispatch) => {
    dispatch(lessonMarkLoading());

    try {
      await ScheduleService.updateMark(data);
      dispatch(lessonMarkSuccess());
    } catch (error) {
      dispatch(lessonMarkFail(error.message));
    }
  };
