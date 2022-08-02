import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const CreateGroupForm = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const data = {
      name: name,
    };

    // TODO: Call login API
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <h5>Create group</h5>
      <hr />
      <Form.Group className="mb-3" controlId="formLoginEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </Form.Group>

      <hr />
      <div className="d-grid gap-2">
        <Button type="submit" variant="success">
          Create
        </Button>
      </div>
    </Form>
  );
};

CreateGroupForm.propTypes = {};

export default CreateGroupForm;
