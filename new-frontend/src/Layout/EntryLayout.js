import React from "react";
import Container from "@mui/material/Container";

import { Outlet } from "react-router-dom";


function EntryLayout() {
  return (
    <Container style={{ paddingTop: "100px" }}>
      <Outlet />
    </Container>
  );
}

export default EntryLayout;
