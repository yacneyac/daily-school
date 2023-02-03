import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
// import { Footer } from "./Footer";
import { Header } from "./Header";

export const DefaultLayout = () => {
  return (
    <div className="default-layout">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Container style={{ maxWidth: "1500px" }}>
          <Outlet />
        </Container>
      </main>
      {/* <footer className="footer">
        <Footer />
      </footer> */}
    </div>
  );
};
