import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Components/user/userSlice";
import loginReducer from "./Components/login/loginSlice";
import timeTableReducer from "./Components/timetable/timeTableSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    timeTable: timeTableReducer,
  },
});

export default store;
