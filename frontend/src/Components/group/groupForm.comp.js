import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Container, Form, InputGroup } from "react-bootstrap";

const GroupForm = (props) => {
  const [group, setGroup] = useState("");

  const params = useParams();

  function onChange(el) {
    var { name, value } = el.target;
    setGroup(value);
  }

  console.log(group);

  return (
    <Container>
      <div className="gap-5 d-md-flex justify-content-md-center">
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroupInput">Group</InputGroup.Text>
          <Form.Select onChange={onChange} name="groupId">
            <option value="1">3-B</option>
            <option value="2">1-B</option>
          </Form.Select>
        </InputGroup>
        
      </div>
    </Container>
  );
};

GroupForm.propTypes = {};

export default GroupForm;
