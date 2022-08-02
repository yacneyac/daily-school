import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
// import LoginForm from "./Components/Form/LoginForm";
import About from "./Components/About";
import News from "./Components/News";
import Home from "./Components/Home";
import PrivateRoute from "./Components/private-route/PrivateRoute";
import UserProfile from "./Components/user/UserProfile";
// import UserSettings from "./Components/User/UserProfile";
// import { Routes, Route, Link } from "react-router-dom";
// import Home from "./Components/Home";
// import { Header } from "./Layout/Header";
// import { Footer } from "./Layout/Footer";
import { DefaultLayout } from "./Layout/DefaultLayout";
// import Entry from "./Components/Entry";
import RegisterForm from "./Components/Form/RegisterForm";
import EntryLayout from "./Layout/EntryLayout";
import LoginForm from "./Components/Form/LoginForm";
import PasswordResetForm from "./Components/Form/PasswordResetForm";
// import About from "./Components/About";

function App() {
  // const [user, setUser] = useState(null);
  // const user = {
  // id: "1",
  // name: "robin",
  // permissions: ["analyze"],
  // roles: ["admin"],
  // };

  const user = true;

  // const handleLogin = () =>
  // setUser({
  //   id: "1",
  //   name: "robin",
  //   permissions: ["analyze"],
  //   roles: ["admin"],
  // });
  // console.log(user, !!user)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<EntryLayout />}>
            <Route path="signin" element={<LoginForm />} />
            <Route path="signup" element={<RegisterForm />} />
            <Route path="reset-pass" element={<PasswordResetForm />} />
          </Route>
        </Routes>

        {/* <DefaultLayout> */}
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="news" element={<News />} />
            <Route element={<PrivateRoute isAllowed={!!user} />}>
              <Route path="settings">
                <Route path="profile" element={<UserProfile />} />
              </Route>
            </Route>
          </Route>
        </Routes>
        {/* </DefaultLayout> */}
      </Router>
    </div>

  );
}

export default App;
