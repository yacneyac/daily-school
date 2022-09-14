import { lessonLoading, lessonSuccess, lessonFail } from "./lessonSlice";

// import { getTimeTable } from "../../api/timeTableApi";
import ScheduleService from "../../services/schedule.service";
import { useNavigate } from "react-router-dom";

export const addLesson = (data) => async (dispatch) => {
  dispatch(lessonLoading());

  try {
    const result = await ScheduleService.createLesson(data);

    // result.data.result.length &&
    //
    dispatch(lessonSuccess());
    console.log("LOAD LESSSON TO REDUX");

    
  } catch (error) {
    //   console.log('err1', JSON.stringify(error))
    //   console.log('err2', error.message)
    //   console.log('err2', error.code)
    //   console.error(`${error.name}: ${error.message}`);

    dispatch(lessonFail(error.message));
  }
};
