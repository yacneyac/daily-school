import React from "react";
import { MenuItem, Select } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import { addMark } from "./LessonMarkAction";
import { AppDispatch, SelectEvent, StoreState } from "../../../../types";

type CellParams = {
  id: number;
  field: string;
};

const SelectEditInputCell = (props: CellParams) => {
  const { id, field } = props;
  const mark = ""; // default value on start editting
  const apiRef = useGridApiContext();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: StoreState) => state.user);
  const { activeLesson } = useSelector((state: StoreState) => state.lesson);
  const lessonDate = new Date(activeLesson.date);

  const handleChange = async (event: SelectEvent) => {
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
            Number(field)
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

const renderSelectEditInputCell = (params: CellParams) => {
  return <SelectEditInputCell {...params} />;
};

export default renderSelectEditInputCell;
