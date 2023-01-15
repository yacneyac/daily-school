import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Alert
} from "react-bootstrap";
// import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { addLesson } from "./lessonAction";
// import { lessonInit } from "./lessonSlice";

const CreateLessonForm = () => {
  const { parameters } = useSelector((state) => state.timeTable);
  const { isLoading, error, created } = useSelector((state) => state.lesson);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  // const navigate = useNavigate();

  const [fields, setFields] = useState({
    time_id: parameters.time[0].id,
    subject_id: parameters.subject[0].id,
    room_id: parameters.room[0].id,
    group_id: parameters.group[0].id,
    day_id: {},
  });

  // const [lessonDate, setLessonDate] = useState();

  // const isWeekday = (date) => {
  //   const day = date.getDay();
  //   return day !== 0
  // };


  // reload page if lesson is created 
  useEffect(() => {
    if (created) {
      window.location.reload();
    }
  }, [created]);

  function onChange(el) {
    var { name, value } = el.target;

    if (el.target.className === "form-check-input") {
      const newDays = fields[name];
      newDays[el.target.id] = el.target.checked;

      value = newDays;
    }

    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // diable Create button
    const dayVal = Object.values(fields.day_id);
    setDisabled(dayVal.every((el) => el === false));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addLesson(fields));
  };

  function makeOptions(optList) {
    return optList.map((opt, index) => {
      return (
        <option key={index} value={opt.id}>
          {opt.name}
        </option>
      );
    });
  }

  function daySwitch(days) {
    return days.map((dayName, index) => {
      // const day = parameters.week.filter((day) => day.name === dayName);
      return (
        <Form.Switch
          key={index}
          // id={day[0].id}
          name="day_id"
          label={dayName}
          onChange={onChange}
        />
      );
    });
  }

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <h5 style={{ textAlign: "center" }}>Add lesson</h5>
      <hr />
      {error && <Alert variant="danger"> {error} </Alert>}
      <Row>
        <Col>{daySwitch(["Monday", "Tuesday", "Wednesday"])}</Col>
        <Col style={{ paddingBottom: "16px" }}>
          {daySwitch(["Thursday", "Friday", "Saturday"])}
        </Col>
      </Row>

      {/* <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroupInput">Date</InputGroup.Text>
        <DatePicker
        className="ds-date"
          dateFormat="yyyy-MM-dd"
          showWeekNumbers
          calendarStartDay={1}
          selected={lessonDate}
          name="date"
          // card={props.cardName}
          // value={lessonDate}
          // style={{borderRadius: "0.375rem"}}
          // minDate={new Date(props.minDate)}
          // excludeDateIntervals={[{start: new Date("2021-12-10"), end: new Date("2021-12-20")}]}
          // required={props.field.required}
          // disabled={field.disabled}
          onChange={(date) => setLessonDate(date)}
          filterDate={isWeekday}
        />
      </InputGroup> */}

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
          disabled={error || disabled || isLoading}
        >
          {isLoading ? "Loading…" : "Create"}
        </Button>
      </div>
    </Form>
  );
};

export default CreateLessonForm;
