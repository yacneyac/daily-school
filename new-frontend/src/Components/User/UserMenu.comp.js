import * as React from "react";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import CalendarViewMonthOutlinedIcon from "@mui/icons-material/CalendarViewMonthOutlined";

import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Badge,
  Divider,
  ListItemText,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { logOut } from "../Login/LoginSlice";
import { logOutUser } from "./UserSlice";
import { useDispatch } from "react-redux";
import TokenService from "../../Services/token.service";

// TODO: load from server
const settings = [
  ["Settings", "news"],
  ["My groups", "dashboard"],
];

export default function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
     if (e.currentTarget.id)
      navigate(e.currentTarget.id);
  };

  const logMeOut = () => {
    TokenService.removeRefreshToken();
    TokenService.removeAccessToken();

    setAnchorElUser(null);
    dispatch(logOut());
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton size="large" color="inherit" style={{ marginRight: "15px" }}>
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {/* <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
        <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
        <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
        <Divider />
        <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
        <MenuItem primaryText="Download" leftIcon={<Download />} /> */}
        {/* <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>LogOut</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>LogOut</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logMeOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>LogOut</ListItemText>
        </MenuItem> */}
        {/* {settings.map((setting) => (
          <MenuItem
            key={setting[0]}
            name={setting[0]}
            onClick={handleCloseUserMenu}
            // component={Link}
            // href={setting[1]}
          >
            <Settings /> {setting[0]}
          </MenuItem>
        ))} */}

        <MenuItem
          id="timetable"
          name="timetable"
          onClick={handleCloseUserMenu}
          // component={Link}
          // href="timetable"
        >
          <ListItemIcon>
            <CalendarViewMonthOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Timetable</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logMeOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>LogOut</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
