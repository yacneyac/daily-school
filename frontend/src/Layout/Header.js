import React, { useEffect } from "react";
import { Nav, Navbar, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import LoginBtn from "../Components/login/LoginBtn";
import { getUserProfile } from "../Components/user/userAction";
import UserMenu from "../Components/user/userMenu";

export const Header = () => {
  // const isAuth = false;
  const { isAuth } = useSelector((state) => state.login);
  const {user, isLoading} = useSelector((state) => state.user);

  // console.log('HEADER user ', user, !user)
  const accessToken = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch()

  console.log('HEADER -->', user, isLoading)

    useEffect(() => {
      if (!user.id && accessToken) {
        console.log('RUN getUserProfile')
        dispatch(getUserProfile())
      }
    }, [])




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
            {/* <a
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
            </a> */}
            {/* <Button variant="outline-link" href="/login">Sign in</Button> */}

            {/* {user.id ? <UserMenu /> : <LoginBtn />} */}
            {user.id && <UserMenu />}
            {!isAuth && <LoginBtn />}

            {/* {user ?
            <LinkContainer to="/settings/profile">
              <Nav.Link>Account settings</Nav.Link>
            </LinkContainer>
            : <LoginBtn />
            } */}

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// https://www.researchgate.net/profile/Athanasios-Christopoulos/publication/339676249/figure/fig3/AS:977245854257154@1610004976427/Dashboard-for-Monitoring-Students-Progress-and-Misconceptions.ppm
