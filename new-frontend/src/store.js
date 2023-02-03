import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Components/User/UserSlice";
import loginReducer from "./Components/Login/LoginSlice";
import timeTableReducer from "./Components/User/Timetable/UserTimeTableSlice";
import lessonReducer from "./Components/User/Lesson/LessonSlice"

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    timeTable: timeTableReducer,
    lesson: lessonReducer
  },
});

export default store;
