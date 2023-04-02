import LoadingButton from "@mui/lab/LoadingButton";
import { Box, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";

const UserPasswordSetting = () => {
  const { user } = useSelector((state) => state.user);
  const [newPassword, setNewPassword] = useState();

  function handleSubmit(e) {}

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        size="small"
        name="password"
        type="password"
        fullWidth
        id="password"
        label="Current password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        size="small"
        name="newPassword"
        type="password"
        fullWidth
        id="newPassword"
        label="New password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <LoadingButton
          // loading
          type="submit"
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          sx={{ mt: 3 }}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UserPasswordSetting;
