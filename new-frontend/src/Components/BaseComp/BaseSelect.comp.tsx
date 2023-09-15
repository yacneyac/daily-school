import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type Options = {
  id: number;
  name: string;
};

type PropsType = {
  label: string;
  disabled: boolean;
  name: string;
  value: string;
  parameters: Options[];
  onHandleChange: (e: SelectChangeEvent<string>) => void;
};

function BaseSelect({
  label,
  disabled,
  name,
  value,
  parameters,
  onHandleChange,
}: PropsType) {
  function makeOptions(optList: Options[]) {
    return optList.map((opt, index) => {
      return (
        <MenuItem key={index} value={opt.id}>
          {opt.name}
        </MenuItem>
      );
    });
  }

  return (
    <FormControl disabled={disabled} size="small" fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        name={name}
        onChange={onHandleChange}
      >
        {makeOptions(parameters)}
      </Select>
    </FormControl>
  );
}

export default BaseSelect;
