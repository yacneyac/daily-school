import { InputAdornment, TextField } from "@mui/material";
import React from "react";

type PropsType = {
  name: string;
  label: string;
  defaultValue: string;
  onChangeHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: JSX.Element;
};

export const BaseTextFieldIcon = ({
  name,
  label,
  defaultValue,
  onChangeHandle,
  Icon,
}: PropsType) => {
  return (
    <TextField
      margin="normal"
      size="small"
      name={name}
      required
      fullWidth
      id={name}
      label={label}
      value={defaultValue}
      onChange={onChangeHandle}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{Icon}</InputAdornment>
        ),
      }}
    />
  );
};
