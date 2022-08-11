import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const CreateLessonForm = (props) => {
  // const { week } = useSelector((state) => state.timeTable);

  const [fields, setFields] = useState({
    time: "",
    subject: "",
    room: "",
    group: "",
    day: "",
  });

  const [selectedDay, setSelectedDay] = useState(null);

  function onChange(el) {
    // const {name, value} = el[0]
    // console.log(name, value)
    const { name, value } = el.target;

    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  console.log(fields);
  console.log(selectedDay);

  const handleSubmit = (event) => {
    event.preventDefault();
    // event.stopPropagation();

    // TODO: Call login API
    console.log(event);
  };

  // from table
  const times = ["09:00", "10:00", "11:00"];
  const subjects = ["Math", "English"];
  const rooms = ["5", "4", "23"];
  const groups = ["3-B", "3-A"];

  function makeOptions(optList) {
    return optList.map((opt, index) => {
      return (
        <option key={index} name={opt} value={opt}>
          {opt}
        </option>
      );
    });
  }

  const optionsSelect = [
    { value: 0, label: "Monday" },
    { value: 1, label: "Tuesday" },
    { value: 2, label: "Wednesday" },
    { value: 3, label: "Thursday" },
    { value: 4, label: "Friday" },
    { value: 5, label: "Saturday" },
  ];

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <h5>Add lesson</h5>
      <hr />
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Time</InputGroup.Text>
        <Select
          isMulti
          components={makeAnimated()}
          options={optionsSelect}
          defaultValue={selectedDay}
          onChange={setSelectedDay}
          name="day"
        />
      </InputGroup>

      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Time</InputGroup.Text>
        <Form.Select value={fields.time} onChange={onChange} name="time">
          {makeOptions(times)}
        </Form.Select>
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Subject</InputGroup.Text>
        <Form.Select value={fields.subject} onChange={onChange} name="subject">
          {makeOptions(subjects)}
        </Form.Select>
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Room</InputGroup.Text>
        <Form.Select value={fields.room} onChange={onChange} name="room">
          {makeOptions(rooms)}
        </Form.Select>
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Group</InputGroup.Text>
        <Form.Select value={fields.group} onChange={onChange} name="group">
          {makeOptions(groups)}
        </Form.Select>
      </InputGroup>

      <hr />
      <div className="d-grid gap-2">
        <Button type="submit" variant="success">
          Create
        </Button>
      </div>
    </Form>
  );
};

export default CreateLessonForm;
