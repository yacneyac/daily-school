import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import About from "./Components/About";
import News from "./Components/News";
import UserProfile from "./Components/User/UserProfile";
import UserSettings from "./Components/User/UserProfile";
// import { Routes, Route, Link } from "react-router-dom";

// import Home from "./Components/Home";
// import Header from "./Components/Header";
import { DefaultLayout } from "./Layout/DefaultLayout";
// import About from "./Components/About";

function App() {
  return (
    <div className="App">
      <Router>
        <DefaultLayout>
          <Routes>
            {/* send page component */}
            <Route path="/" element={<News />} />
            <Route path="about" element={<About />} />
            <Route path="news" element={<News />} />
            <Route path="settings">
              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </DefaultLayout>
      </Router>
      {/* <Header /> */}
      {/* <Routes> */}
      {/* <Header /> */}
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="home" element={<Home />} /> */}
      {/* <Route path="about" element={<About />} /> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
