import React from "react";
import { Nav, Navbar, Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import LoginBtn from "../Components/Button/LoginBtn";
import UserMenu from "../Components/user/UserMenu";

export const Header = ({ user }) => {
  // const isAuth = false;

  return (
    <Navbar fixed="top" bg="light" expand="md">
      <Container fluid style={{ marginLeft: "100px", marginRight: "100px" }}>
        <Navbar.Brand>Daily School</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <LinkContainer to="news">
              <Nav.Link>News</Nav.Link>
            </LinkContainer>
            <LinkContainer to="about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form className="d-flex">
            <a
              href="/signin"
              style={{
                textDecoration: "none",
                color: "gray",
                marginRight: "10px",
              }}
            >
              Sign in
            </a>
            <a href="/signup" style={{ textDecoration: "none", color: "gray" }}>
              Sign up
            </a>
            {/* <Button variant="outline-link" href="/login">Sign in</Button> */}
          </Form>
          {/* {user ? <UserMenu /> : <LoginBtn />} */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// https://www.researchgate.net/profile/Athanasios-Christopoulos/publication/339676249/figure/fig3/AS:977245854257154@1610004976427/Dashboard-for-Monitoring-Students-Progress-and-Misconceptions.ppm
