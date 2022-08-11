import {
  fetchTimeTableLoading,
  fetchTimeTableSuccess,
  fetchTimeTableFail,
} from "./timeTableSlice";

// import { getTimeTable } from "../../api/timeTableApi";
import UserService from "../../services/user.service";
import timeTables from "./dummyLessons.json";

export const fetchTimeTable = () => async (dispatch) => {
  dispatch(fetchTimeTableLoading());
  try {
    const result = await UserService.getTimeTable();
    // result.data.result.length &&
    //
    dispatch(fetchTimeTableSuccess(timeTables));
    console.log("LOAD TIMETABLE TO REDUX");
  } catch (error) {
    console.log(error)
    dispatch(fetchTimeTableFail(error.message));
  }
};
