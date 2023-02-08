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

  console.log("SelectEditInputCell:::1", { id, field, value });

  const handleChange = async (event) => {
    console.log("handleChange:::2", { id, field, value: event.target.value });
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    apiRef.current.stopCellEditMode({ id, field });

    const dateParts = activeLesson.date.split("-");

    // let day = field;
    // if (field.length === 1) {
    //   day = "0" + day;
    // }

    dispatch(
      addMark({
        teacher_id: user.id,
        student_id: id,
        subject_id: activeLesson.db_id,
        mark: event.target.value,
        date: new Date(dateParts[0], dateParts[1] - 1, field).getTime() / 1000,
        day: field,
      })
    );
  };

  //TODO: get from server
  return (
    <Select value={mark} onChange={handleChange} autoWidth>
      <MenuItem value="">
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
