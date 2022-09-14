import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "./Login.style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginPending, loginSuccess, loginFail } from "./loginSlice";
import AuthService from "../../services/auth.service"


function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.login);
  const userState = useSelector((state) => state.user);
  // const accessToken = sessionStorage.getItem("accessToken");

  const [email, setEmail] = useState("t@t.com");
  const [password, setPassword] = useState("pass");

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      loginSuccess();
      console.log('loginSuccess')
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    dispatch(loginPending());

    try {
      await AuthService.login(email, password);
      // console.log("isAuth: ", auth);
      // if (auth.access_token){
      //   const user = dispatch(getUserProfile())
      //   console.log('USER: ', user)
      // }
     
      
      dispatch(loginSuccess());

      // dispatch(getUserProfile())
      console.log("GO TO /dashboard");
      navigate("/dashboard");

      // REDIRECT HERE
      // navigate('/auth/user-home')
    } catch (error) {
      console.log("LOGIN FORM ERROR: ", error);
      // if (error.code === "ERR_NETWORK") {
      dispatch(loginFail(error.message));
      // } else {
        // console.log(JSON.stringify(error.message))
        // dispatch(loginFail(error.message));
      // }
    }
  };

  return (
    <Form
      onSubmit={handleSubmitLogin}
      autoComplete="off"
      className="login-form"
      // style={{ padding: "16px" }}
    >
      <h5 style={{ textAlign: "center" }}>Sign in to DailySchool</h5>
      <hr />
      {(error || userState.error) && <Alert variant="danger"> {error} </Alert>}
      <Form.Group className="mb-3" controlId="formLoginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </Form.Group>
      <div className="position-relative">
        <Form.Group className="mb-3" controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" variant="success" disabled={isLoading}>
            {isLoading ? "Loading…" : "Sign in"}
          </Button>
          {/* {isLoading && <Spinner animation="border" />} */}
        </div>
        <a
          href="/reset-pass"
          className="top-0 right-0 position-absolute label-link"
          style={{ textDecoration: "none" }}
        >
          Forgot password?
        </a>
      </div>

      <hr />

      <Container>
        <Row style={{ fontSize: "15px" }}>
          <Col md={6} style={{ paddingLeft: "0" }}>
            <a href="/signup">Create an account</a>
          </Col>
          <Col md={{ span: 2, offset: 4 }}>
            <a href="/">Home</a>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

// LoginForm.propTypes = {
// formSwitcher: PropTypes.func.isRequired,
// };

export default LoginForm;
