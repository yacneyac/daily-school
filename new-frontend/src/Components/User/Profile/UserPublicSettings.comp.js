import { InputAdornment, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import { BaseTextFieldIcon } from "../../BaseComp/BaseTextFieldIcon.comp";

const UserPublicSettings = () => {
  const { user } = useSelector((state) => state.user);

  const [fname, setFname] = useState(user.first_name || "");
  const [mname, setMname] = useState(user.middle_name || "");
  const [lname, setLname] = useState(user.last_name || "");
  const [address, setAddress] = useState(user.address || "");
  const [birth, setBirth] = useState(user.date_of_birth || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [homePhone, setHomePhone] = useState(user.home_phone || "");


  // const dateValue = new Date(user.date_of_birth)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let formDataObject = Object.fromEntries(data.entries());
    // Format the plain form data as JSON
    let formDataJsonString = JSON.stringify(formDataObject);
    console.log("data", formDataJsonString);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <BaseTextFieldIcon
        Icon={<AccountCircleOutlinedIcon />}
        label="First Name"
        name="firstName"
        defaultValue={fname}
        onChange={(e) => setFname(e.target.value)}
      />
      <BaseTextFieldIcon
        Icon={<AccountCircleOutlinedIcon />}
        label="Middle Name"
        name="middleName"
        defaultValue={mname}
        onChange={(e) => setMname(e.target.value)}
      />
      <BaseTextFieldIcon
        Icon={<AccountCircleOutlinedIcon />}
        label="Last Name"
        name="lastName"
        defaultValue={lname}
        onChange={(e) => setLname(e.target.value)}
      />
      <BaseTextFieldIcon
        Icon={<HomeOutlinedIcon />}
        label="Address"
        name="address"
        defaultValue={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <BaseTextFieldIcon
        Icon={<ContactPhoneOutlinedIcon />}
        label="Phone"
        name="phone"
        defaultValue={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <BaseTextFieldIcon
        Icon={<SmartphoneOutlinedIcon />}
        label="Home Phone"
        name="homePhone"
        defaultValue={homePhone}
        onChange={(e) => setHomePhone(e.target.value)}
      />

      {/* <hr/> */}
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

export default UserPublicSettings;
