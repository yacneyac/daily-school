import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const UserPassSettings = () => {
  const { user } = useSelector((state) => state.user);
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");

  // const confirmPass = (e) => {
  //   console.log(e.target.value);

  //   if (newPass !== e.target.value) {
  //     setError("invalid pass");
  //   } else {
  //     setError("");
  //   }
  // };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formRegisterPass">
        <Form.Control
          type="password"
          name="pass"
          placeholder="Current password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRegisterRPass">
        <Form.Control
          type="password"
          name="npass"
          placeholder="New password"
          // value={newPass}
          // onChange={confirmPass}
          // onChange={(e) => setNewPass(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRegisterRPass">
        <Form.Control
          type="password"
          name="cnpass"
          placeholder="Confirm new password"
          // onChange={confirmPass}
        />
      </Form.Group>
      <hr />
      {/* {error && <Alert variant="danger"> {error} </Alert>} */}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button type="submit" variant="secondary">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default UserPassSettings;
