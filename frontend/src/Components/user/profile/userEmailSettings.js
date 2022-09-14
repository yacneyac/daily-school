import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const UserEmailSettings = () => {
  const { user } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  // const [mname, setMname] = useState("");
  // const [lname, setLname] = useState("");

  useEffect(() => {
    setEmail(user.email);
  }, [user]);
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Control
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email address"
          required
        />
      </Form.Group>
      <hr />
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button type="submit" variant="secondary">
          Save
        </Button>
      </div>
    </Form>
  );
};

// UserEmailSettings.propTypes = {};

export default UserEmailSettings;
