import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

const UserPubSettings = () => {
  const { user } = useSelector((state) => state.user);

  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [birth, setBirth] = useState();

  // const dateValue = new Date(user.date_of_birth)

  useEffect(() => {
    setFname(user.first_name);
    setMname(user.middle_name);
    setLname(user.last_name);
    setAddress(user.address);
    setBirth(new Date(user.date_of_birth))
  }, [user]);

  // console.log("UserPubSettings fname -->", fname);
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formProfileFname">
        <Form.Control
          name="fname"
          placeholder="First name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formProfileMname">
        <Form.Control
          name="mname"
          placeholder="Middle name"
          value={mname}
          onChange={(e) => setMname(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProfileLname">
        <Form.Control
          name="lname"
          placeholder="Last name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProfileAddress">
        <Form.Control
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formProfileDname">
        {/* <Form.Control name="dbirth" placeholder="Date of birth" /> */}
        <DatePicker
        className="ds-date"
          dateFormat="yyyy-MM-dd"
          calendarStartDay={1}
          selected={birth}
          name="birth"
          // card={props.cardName}
          value={birth}
          // style={{border-radius: "0.375rem"}}
          // minDate={new Date(props.minDate)}
          // excludeDateIntervals={[{start: new Date("2021-12-10"), end: new Date("2021-12-20")}]}
          // required={props.field.required}
          // disabled={field.disabled}
          onChange={(date) => setBirth(date)}
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


export default UserPubSettings;
