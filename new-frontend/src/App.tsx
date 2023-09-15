import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./Components/About";
import News from "./Components/News";
import Home from "./Components/Home";
import TopNavBar from "./Components/TopNavBar";
import SignIn from "./Components/Login/SignIn.comp";
import SignUp from "./Components/Login/SignUp.comp";
import ResetPassword from "./Components/Login/ResetPassword.comp";
import UserTimeTable from "./Components/User/Timetable/UserTimeTable.comp";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.comp";
import LessonForm from "./Components/User/Lesson/LessonForm.comp";
import UserProfile from "./Components/User/Profile/UserProfile.comp";


function App() {
  console.log("INIT APP");
  return (
    <div className="App">
      <Router>
        <TopNavBar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="news" element={<News />} />

          <Route element={<PrivateRoute />}>
            {/* <Route path="settings"> */}
            {/* <Route path="profile" element={<UserProfile />} /> */}
            {/* </Route> */}
            <Route path="settings" element={<UserProfile />} />
            <Route path="timetable" element={<UserTimeTable />} />
            <Route path="lessons/:lessonId" element={<LessonForm />} />
            {/* <Route path="group/:groupId" element={<GroupForm />} /> */}
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-pass" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
