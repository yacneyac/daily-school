import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

// import PasswordResetForm from "./PasswordResetForm";
// import RegisterForm from "./RegisterForm";

import "./Login.style.css";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const loginData = {
      email: email,
      pass: password,
    };

    // TODO: Call login API
    console.log(loginData);
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
          <Button type="submit" variant="success">
            Sign in
          </Button>
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

LoginForm.propTypes = {
  // formSwitcher: PropTypes.func.isRequired,
};

export default LoginForm;
