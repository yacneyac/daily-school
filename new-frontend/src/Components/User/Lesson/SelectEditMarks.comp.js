import React from "react";
import { MenuItem, Select } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { addMark } from "./LessonMarkAction";
import { useDispatch, useSelector } from "react-redux";

const SelectEditInputCell = (props) => {
  const { id, value, field } = props;
  const mark = ""; // default value on start editting
  const apiRef = useGridApiContext();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeLesson } = useSelector((state) => state.lesson);
  const lessonDate = new Date(activeLesson.date);



  const handleChange = async (event) => {
    let mark = event.target.value;
    if (event.target.value === "0") {
      mark = "";
    }

    await apiRef.current.setEditCellValue({
      id,
      field,
      value: mark,
    });
    apiRef.current.stopCellEditMode({ id, field });

    // let mark = event.target.value;
    // if (event.target.value === "0") {
    //   mark = "";
    // }
    dispatch(
      addMark({
        teacher_id: user.id,
        student_id: id,
        subject_id: activeLesson.db_id,
        mark: mark,
        date:
          new Date(
            lessonDate.getFullYear(),
            lessonDate.getMonth(),
            field
          ).getTime() / 1000,
        day: field,
      })
    );
  };

  //TODO: get from server
  return (
    <Select value={mark} onChange={handleChange} autoWidth>
      <MenuItem value="0">
        <em>None</em>
      </MenuItem>
      <MenuItem value="1">1</MenuItem>
      <MenuItem value="2">2</MenuItem>
      <MenuItem value="3">3</MenuItem>
      <MenuItem value="4">4</MenuItem>
      <MenuItem value="5">5</MenuItem>
      <MenuItem value="N">N</MenuItem>
    </Select>
  );
};

SelectEditInputCell.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.any,
};

const renderSelectEditInputCell = (params) => {
  return <SelectEditInputCell {...params} />;
};

export default renderSelectEditInputCell;
