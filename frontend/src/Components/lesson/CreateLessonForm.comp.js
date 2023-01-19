import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addLesson } from "./lessonAction";
import { lessonInit } from "./lessonSlice";

const CreateLessonForm = () => {
  const { parameters, activeWeekNumber } = useSelector(
    (state) => state.timeTable
  );
  const { isLoading, error, created } = useSelector((state) => state.lesson);
  const dispatch = useDispatch();
  const [disabledBtn, setDisabledBtn] = useState(true);

  const [fields, setFields] = useState({
    time_id: parameters.time[0].id,
    subject_id: parameters.subject[0].id,
    room_id: parameters.room[0].id,
    group_id: parameters.group[0].id,
    day_id: {},
  });

  // reload page if lesson is created
  useEffect(() => {
    if (created) {
      window.location.reload();
    }
  }, [created]);

  function onChange(el) {
    var { name, value } = el.target;

    // switch
    if (el.target.className === "form-check-input") {
      const newDays = fields[name];
      newDays[el.target.id] = el.target.checked;

      value = newDays;

      console.log("newDays: ", newDays);
    }

    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // diable Create button
    const dayVal = Object.values(fields.day_id);
    setDisabledBtn(dayVal.every((el) => el === false));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fields["week_id"] = activeWeekNumber;
    dispatch(addLesson(fields));
    dispatch(lessonInit());
  };

  function makeOptions(optList) {
    return optList.map((opt, index) => {
      return (
        <option key={index} value={opt.id} disabled={opt.disabled}>
          {opt.name}
        </option>
      );
    });
  }

  function daySwitch(days) {
    return days.map((dayName, index) => {
      const day = parameters.week.filter((day) => day.name === dayName);
      return (
        <Form.Switch
          key={index}
          id={day[0].day_id}
          name="day_id"
          label={dayName}
          onChange={onChange}
        />
      );
    });
  }

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <h5 style={{ textAlign: "center" }}>Create a lesson</h5>
      <hr />
      {error && <Alert variant="danger"> {error} </Alert>}
      <Row>
        <Col>{daySwitch(["Monday", "Tuesday", "Wednesday"])}</Col>
        <Col style={{ paddingBottom: "16px" }}>
          {daySwitch(["Thursday", "Friday", "Saturday"])}
        </Col>
      </Row>

      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Time</InputGroup.Text>
        <Form.Select onChange={onChange} name="time_id">
          {makeOptions(parameters.time)}
        </Form.Select>
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Subject</InputGroup.Text>
        <Form.Select onChange={onChange} name="subject_id">
          {makeOptions(parameters.subject)}
        </Form.Select>
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Room</InputGroup.Text>
        <Form.Select onChange={onChange} name="room_id">
          {makeOptions(parameters.room)}
        </Form.Select>
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Group</InputGroup.Text>
        <Form.Select onChange={onChange} name="group_id">
          {makeOptions(parameters.group)}
        </Form.Select>
      </InputGroup>

      <hr />
      <div className="d-grid gap-2">
        <Button
          type="submit"
          variant="success"
          disabled={error || disabledBtn || isLoading}
        >
          {isLoading ? "Loading…" : "Create"}
        </Button>
      </div>
    </Form>
  );
};

export default CreateLessonForm;
