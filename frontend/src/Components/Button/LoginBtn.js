import React, { useState } from "react";
import { Button } from "react-bootstrap";

import LoginModal from "../Modal/LoginModal";

function LoginBtn() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <a
        href="/login"
        // className="top-0 right-0 position-absolute label-link"
        style={{ textDecoration: "none" }}
      >
        Sign in
      </a>
      <a href="/login" style={{ textDecoration: "none" }}>
        Sign up
      </a>
      {/* <Button variant="secondary" onClick={() => setModalShow(true)}>
        Sign in
      </Button>
      <Button variant="secondary" onClick={() => setModalShow(true)}>
        Sign up
      </Button>
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} /> */}
    </>
  );
}

export default LoginBtn;
