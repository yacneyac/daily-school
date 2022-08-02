import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import LoginModal from "../Modal/LoginModal";

// const isAuth = true;

function PrivateRoute({ isAllowed, redirectPath = "/login", children }) {
  // console.log(children);
  const [modalShow, setModalShow] = useState(false);

  if (!isAllowed) {
    // setModalShow(true)
    // return <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default PrivateRoute;
