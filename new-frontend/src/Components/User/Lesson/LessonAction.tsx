import {
  lessonLoading,
  lessonSuccess,
  lessonFail,
  lessonDeleted,
  lessonSelect,
} from "./LessonSlice";

import ScheduleService from "../../../Services/schedule.service";
import { AppDispatch, LessonCreate } from "../../../types";

export const addLesson =
  (data: LessonCreate) => async (dispatch: AppDispatch) => {
    dispatch(lessonLoading());

    try {
      await ScheduleService.createLesson(data);
      dispatch(lessonSuccess());
    } catch (error) {
      dispatch(lessonFail(error.message));
    }
  };

export const fetchLesson =
  (teacherId: number, lessonId: number) => async (dispatch: AppDispatch) => {
    dispatch(lessonLoading());

    try {
      const result = await ScheduleService.getLesson(teacherId, lessonId);
      dispatch(lessonSelect(result));
    } catch (error) {
      dispatch(lessonFail(error.message));
    }
  };

export const removeLesson =
  (weekId: number, lessonId: number) => async (dispatch: AppDispatch) => {
    dispatch(lessonLoading());

    try {
      await ScheduleService.deleteLesson(weekId, lessonId);
      dispatch(lessonDeleted());
    } catch (error) {
      dispatch(lessonFail(error.message));
    }
  };
