import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { DefaultLayout } from "./Layout/DefaultLayout";
import EntryLayout from "./Layout/EntryLayout";
import About from "./Components/About";
import News from "./Components/News";
import Home from "./Components/Home";
import SignIn from "./Components/Login/SignIn.comp";
import SignUp from "./Components/Login/SignUp.comp";
import ResetPassword from "./Components/Login/ResetPassword.comp";
import "./App.css";
// import UserDashboard from "./components/user/UserDashboard";
import UserTimeTable from "./Components/User/Timetable/UserTimeTable.comp";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.comp";

function App() {
  console.log("INIT APP");
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        {/* <DefaultLayout> */}
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="news" element={<News />} />

            {/* <Route path="timetable" element={<UserTimeTable />} /> */}
            <Route element={<PrivateRoute />}>
              {/* <Route path="settings"> */}
                {/* <Route path="profile" element={<UserProfile />} /> */}
              {/* </Route> */}
              <Route path="timetable" element={<UserTimeTable />} />
              {/* <Route path="group/:groupId" element={<GroupForm />} /> */}
            </Route>
          </Route>
        </Routes>
        {/* </DefaultLayout> */}

        <Routes>
          <Route element={<EntryLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-pass" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
