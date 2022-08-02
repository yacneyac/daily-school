import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const UserPassSettings = (props) => {
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
        <Form.Control type="password" name="npass" placeholder="New password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRegisterRPass">
        <Form.Control
          type="password"
          name="cnpass"
          placeholder="Confirm new password"
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

UserPassSettings.propTypes = {};

export default UserPassSettings;
