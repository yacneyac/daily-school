import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

function RegisterForm(props) {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  // const [mname, setMname] = useState("")
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [rpass, setRpass] = useState("");
  const [code, setCode] = useState("");
  const [show, setShow] = useState(true)

  const [err, setErr] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (pass !== rpass) {
      alert("pass!!");
    }

    const registerData = {
      email: email,
      fname: fname,
      // mname: mname,
      lname: lname,
      pass: pass,
    };

    // TODO: Call regsiter API
    console.log(registerData);
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit} className="login-form">
      <h5 style={{ textAlign: "center" }}>Create an account</h5>
      <hr />
      <Form.Group className="mb-3" controlId="formRegisterFName">
        {/* <Form.Label>Fisrt name</Form.Label> */}
        <Form.Control
          name="fname"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          value={fname}
          required
        />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formRegisterMName"> */}
      {/* <Form.Label>Middle name</Form.Label> */}
      {/* <Form.Control name="mName" placeholder="Middle name" required /> */}
      {/* </Form.Group> */}
      <Form.Group className="mb-3" controlId="formRegisterLName">
        {/* <Form.Label>Last name</Form.Label> */}
        <Form.Control
          name="lname"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
          value={lname}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRegisterEmail">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control
          type="email"
          name="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRegisterPassword">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control
          type="password"
          name="pass"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRegisterRPassword">
        {/* <Form.Label>Repeat Password</Form.Label> */}
        <Form.Control
          type="password"
          name="rPass"
          placeholder="Repeat password"
          onChange={(e) => setRpass(e.target.value)}
          value={rpass}
          required
        />
      </Form.Group>

      <Form.Check
        className="mb-3"
        type="switch"
        label="Is a teacher?"
        id="disabled-custom-switch"
        onClick={() => setShow(!show)}
      />
          <Form.Group className="mb-3" controlId="formRegisterCode">
        {/* <Form.Label>Last name</Form.Label> */}
        <Form.Control
          hidden={show}
          name="code"
          placeholder="Code"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
      </Form.Group>


      <div className="d-grid gap-2">
        <Button type="submit" variant="success">
          Register
        </Button>
      </div>

      <hr />

      <a
        href="/signin"
        style={{ fontSize: "15px" }}
        // onClick={() => {
        // props.formSwitcher("login");
        // }}
      >
        Log in
      </a>
    </Form>
  );
}

RegisterForm.propTypes = {
  // formSwitcher: PropTypes.func.isRequired,
};

export default RegisterForm;
