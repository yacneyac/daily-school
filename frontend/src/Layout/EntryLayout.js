import React from "react";
import { Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";

// import "./Login.style.css";

function EntryLayout() {
  return (
    <Container style={{ paddingTop: "100px" }}>
      <div
        className="bg-light"
        style={{ width: "350px", margin: "0 auto", borderRadius: "6px" }}
      >
        <Outlet />
      </div>
    </Container>
  );
}

export default EntryLayout;
