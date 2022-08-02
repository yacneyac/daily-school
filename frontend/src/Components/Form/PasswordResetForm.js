import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropsTypes from "prop-types";


function PasswordResetForm(props) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const resetData = {
      email: email,
    };

    // todo: call reset password API
    console.log(resetData);
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off" className="login-form">
      <h5 style={{ textAlign: "center" }}>Reset your password</h5>
      <hr />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          Enter your user account's verified email address and we will send you
          a password reset link.
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button type="submit" variant="success">
          Ok
        </Button>
      </div>
      <hr />
      <a
        href="/signin"
        style={{ fontSize: "15px" }}
        // onClick={() => props.formSwitcher("login")}
      >
        Log in
      </a>
    </Form>
  );
}

PasswordResetForm.propsTypes = {
  // formSwitcher: PropsTypes.func.isRequired,
};

export default PasswordResetForm;
