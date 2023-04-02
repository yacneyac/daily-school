import { Box, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";


const UserEmailSetting = () => {
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState(user.email);

  function handleSubmit(e) {}

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        size="small"
        name="email"
        required
        fullWidth
        id="email"
        label="Email"
        defaultValue={email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlinedIcon />
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

export default UserEmailSetting;
