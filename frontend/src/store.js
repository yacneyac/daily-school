import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Components/user/userSlice";
import loginReducer from "./Components/login/loginSlice";
import timeTableReducer from "./Components/timetable/timeTableSlice";
import lessonReducer from "./Components/lesson/lessonSlice"

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    timeTable: timeTableReducer,
    lesson: lessonReducer
  },
});

export default store;
