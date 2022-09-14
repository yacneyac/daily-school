import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import About from "./Components/About";
import News from "./Components/News";
import Home from "./Components/Home";
import PrivateRoute from "./Components/private-route/PrivateRoute";
import UserProfile from "./Components/user/userProfile";
import UserDashboard from "./Components/user/dashboard/dashboard";
import { DefaultLayout } from "./Layout/DefaultLayout";
import RegisterForm from "./Components/Form/RegisterForm";
import EntryLayout from "./Layout/EntryLayout";
import LoginForm from "./Components/login/LoginForm";
import PasswordResetForm from "./Components/Form/PasswordResetForm";
import { useSelector } from "react-redux";
import GroupForm from "./Components/group/groupForm.comp";


function App() {
  const { user } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.login);
  // const isAuth = true
  console.log("APP ", user, isAuth);
  // const accessToken = sessionStorage.getItem("accessToken");
  // const dispatch = useDispatch();

  // automatically authenticate user if token is found
  // useEffect(() => {
  //   if (!user.id && accessToken) {
  //     console.log("RUN getUserProfile");
  //     dispatch(getUserProfile());
  //   }
  // }, [accessToken, dispatch]);

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
            <Route element={<PrivateRoute />}>
              {/* <Route element={<PrivateRoute />}> */}
              <Route path="settings">
                <Route path="profile" element={<UserProfile />} />
              </Route>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="group/:groupId" element={<GroupForm />} />
            </Route>
          </Route>
        </Routes>
        {/* </DefaultLayout> */}

        <Routes>
          <Route element={<EntryLayout />}>
            <Route path="/signin" element={<LoginForm />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/reset-pass" element={<PasswordResetForm />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
