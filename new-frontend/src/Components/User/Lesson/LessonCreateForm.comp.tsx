import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

import { addLesson } from "./LessonAction";
import { lessonInit } from "./LessonSlice";
import BaseSelect from "../../BaseComp/BaseSelect.comp";
import { AppDispatch, FormEvent, SelectEvent, StoreState } from "../../../types";
import { func } from "prop-types";
import { ContactSupportOutlined } from "@mui/icons-material";

const LessonCreateForm = (props: { handleClose: () => void }) => {
  const { parameters, activeWeekNumber } = useSelector(
    (state: StoreState) => state.timeTable
  );

  const lessonState = useSelector((state: StoreState) => state.lesson);
  const dispatch: AppDispatch = useDispatch();
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
    if (lessonState.created) {
      window.location.reload();
    }
  }, [lessonState.created]);


  function onChangeSelect(e: SelectEvent){
    console.log(e.target)
  }
  
  function onChangeSwitch(e: React.ChangeEvent<HTMLInputElement>) {
    var { id, name, value, checked } = e.target;


      // const newDays = fields[name];
      // newDays[id] = checked;
      // value = newDays;


    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // diable Create button// move to useEffect
    const dayVal = Object.values(fields.day_id);
    setDisabledBtn(dayVal.every((el) => el === false));
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('send lessond')
    // fields["week_id"] = activeWeekNumber;
    // dispatch(addLesson(fields));
    // dispatch(lessonInit());
  };

  // console.log("fields", fields);

  function daySwitch(days: string[]) {
    return days.map((dayName, index) => {
      const day = parameters.week.filter((day) => day.name === dayName);
      return (
        <FormControlLabel
          key={index}
          control={<Switch id={day[0].day_id.toString()} name="day_id" onChange={onChangeSwitch}/>}
          // name="day_id"
          label={dayName}
        />
      );
    });
  }

  return (
    <>
      <hr />
      {lessonState.error && (
        <Alert severity="error"> {lessonState.error} </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", mb: 2 }}>
          <FormControl
            disabled={lessonState.isLoading}
            sx={{ ml: 3 }}
            component="fieldset"
          >
            <FormGroup>
              {daySwitch(["Monday", "Tuesday", "Wednesday"])}
            </FormGroup>
          </FormControl>
          <FormControl
            disabled={lessonState.isLoading}
            sx={{ ml: 9 }}
            component="fieldset"
          >
            <FormGroup>
              {daySwitch(["Thursday", "Friday", "Saturday"])}
            </FormGroup>
          </FormControl>
        </Box>
        <Stack spacing={3} sx={{ mb: 2 }}>
          <BaseSelect
            disabled={lessonState.isLoading}
            label="Time"
            name="time_id"
            value={fields.time_id.toString()}
            handleChange={onChangeSelect}
            parameters={parameters.time}
          />
          <BaseSelect
            disabled={lessonState.isLoading}
            label="Subject"
            name="subject_id"
            value={fields.subject_id.toString()}
            handleChange={onChangeSelect}
            parameters={parameters.subject}
          />
          <BaseSelect
            disabled={lessonState.isLoading}
            label="Room"
            name="room_id"
            value={fields.room_id.toString()}
            handleChange={onChangeSelect}
            parameters={parameters.room}
          />
        </Stack>
        <hr />
        <Stack spacing={1} direction="row" justifyContent="flex-end">
          <Button
            disabled={lessonState.isLoading}
            type="submit"
            size="small"
            variant="contained"
          >
            OK
          </Button>
          <Button
            disabled={lessonState.isLoading}
            size="small"
            variant="contained"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
        </Stack>

        {lessonState.isLoading && (
          <CircularProgress
            size={50}
            sx={{
              position: "absolute",
              top: "50%",
              left: "48%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </>
  );
};

export default LessonCreateForm;
