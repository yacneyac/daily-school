import {
  fetchTimeTableLoading,
  fetchTimeTableSuccess,
  fetchTimeTableParametersSuccess,
  fetchTimeTableFail,
} from "./UserTimeTableSlice";

import ScheduleService from "../../../Services/schedule.service";
import { AppDispatch } from "../../../types";

export const fetchTimeTable =
  (weekId: number | null) => async (dispatch: AppDispatch) => {
    dispatch(fetchTimeTableLoading());
    try {
      let result = {};

      if (!weekId) {
        result = await ScheduleService.getSchedule();
      } else {
        result = await ScheduleService.getScheduleById(weekId);
      }

      dispatch(fetchTimeTableSuccess(result));
      console.log("LOAD TIMETABLE TO REDUX");

      const params = await ScheduleService.getScheduleParameters();
      dispatch(fetchTimeTableParametersSuccess(params));
      console.log("LOAD TIMETABLE PARAMS TO REDUX");
    } catch (error) {
      console.log(error);
      dispatch(fetchTimeTableFail(error.message));
    }
  };
