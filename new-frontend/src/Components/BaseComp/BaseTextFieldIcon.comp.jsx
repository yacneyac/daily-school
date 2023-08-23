import { InputAdornment, TextField } from "@mui/material";
import React from "react";

// {Icon, label, defaultValue, name}
export const BaseTextFieldIcon = (props) => {
  return (
    <TextField
      margin="normal"
      size="small"
      name={props.name}
      required
      fullWidth
      id={props.name}
      label={props.label}
      value={props.defaultValue}
      onChange={props.onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {props.Icon}
          </InputAdornment>
        ),
      }}
    />
  );
};
