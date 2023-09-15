import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Components/User/UserSlice";
import loginReducer from "./Components/Login/LoginSlice";
import timeTableReducer from "./Components/User/Timetable/UserTimeTableSlice";
import lessonReducer from "./Components/User/Lesson/LessonSlice";
import lessonMarkReducer from "./Components/User/Lesson/Mark/LessonMarkSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    timeTable: timeTableReducer,
    lesson: lessonReducer,
    lessonMark: lessonMarkReducer,
  },
});


export default store;
