import {
  fetchTimeTableLoading,
  fetchTimeTableSuccess,
  fetchTimeTableParametersSuccess,
  fetchTimeTableFail,
} from "./timeTableSlice";

// import { getTimeTable } from "../../api/timeTableApi";
import ScheduleService from "../../services/schedule.service";
import timeTables from "./dummyLessons.json";

export const fetchTimeTable = () => async (dispatch) => {
  dispatch(fetchTimeTableLoading());
  try {
    const result = await ScheduleService.getSchedule();
    // result.data.result.length &&
    //
    dispatch(fetchTimeTableSuccess(result));
    console.log("LOAD TIMETABLE TO REDUX");


    const params = await ScheduleService.getScheduleParameters();
    dispatch(fetchTimeTableParametersSuccess(params));
    console.log("LOAD TIMETABLE PARAMS TO REDUX");


  } catch (error) {
    console.log(error)
    dispatch(fetchTimeTableFail(error.message));
  }
};
