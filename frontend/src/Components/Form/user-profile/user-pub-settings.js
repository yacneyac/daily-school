import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";


const UserPubSettings = (props) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formProfileFname">
        <Form.Control name="fname" placeholder="First name" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formProfileMname">
        <Form.Control name="mname" placeholder="Middle name" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProfileLname">
        <Form.Control name="lname" placeholder="Last name" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProfileDname">
        <Form.Control name="dbirth" placeholder="Date of birth" required />
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

UserPubSettings.propTypes = {};

export default UserPubSettings;
