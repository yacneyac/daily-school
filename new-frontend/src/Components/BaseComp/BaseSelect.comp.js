import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function BaseSelect(props) {
  function makeOptions(optList) {
    return optList.map((opt, index) => {
      return (
        <MenuItem key={index} value={opt.id}>
          {opt.name}
        </MenuItem>
      );
    });
  }

  return (
    <FormControl disabled={props.disabled} size="small" fullWidth>
      <InputLabel id={props.label + "-lable"}>{props.label}</InputLabel>
      <Select
        labelId={props.label + "-label"}
        id={props.label + "-select"}
        value={props.value}
        label={props.label}
        name={props.name}
        onChange={props.handleChange}
      >
        {makeOptions(props.parameters)}
      </Select>
    </FormControl>
  );
}

BaseSelect.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  parameters: PropTypes.array,
};

export default BaseSelect;
