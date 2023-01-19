import {
  fetchTimeTableLoading,
  fetchTimeTableSuccess,
  fetchTimeTableParametersSuccess,
  fetchTimeTableFail,
} from "./timeTableSlice";

import ScheduleService from "../../services/schedule.service";

export const fetchTimeTable = (page) => async (dispatch) => {
  dispatch(fetchTimeTableLoading());
  try {
    const result = await ScheduleService.getSchedule(page);

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
