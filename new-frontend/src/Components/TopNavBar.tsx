import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import { useDispatch, useSelector } from "react-redux";

import UserMenu from "./User/UserMenu.comp";
import { getUserProfile } from "./User/UserAction";
import { loginSuccess } from "./Login/LoginSlice";
import { Link } from "react-router-dom";
import { Divider, Stack } from "@mui/material";

import { StoreState, AppDispatch } from "../types";


export default function TopNavBar() {

  const { isAuth } = useSelector((state: StoreState) => state.login);
  const { user } = useSelector((state: StoreState) => state.user);
  const accessToken = sessionStorage.getItem("accessToken");
  const dispatch: AppDispatch = useDispatch();

  console.log("Load TopNavBar", user, isAuth, accessToken);

  useEffect(() => {
    if (Object.keys(user).length === 0 && accessToken) {
      console.log("RUN getUserProfile");
      dispatch(getUserProfile());
      dispatch(loginSuccess());
    }
  }, [user, accessToken, dispatch]);

  return (
    <AppBar position="sticky">
      <Container style={{ maxWidth: "1550px" }}>
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 10,
              fontWeight: 700,
              color: "inherit",
            }}
          >
            Daily School
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            sx={{ flexGrow: 1 }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Link to="/news" className="NavLink">
              News
            </Link>
            <Link to="/about" className="NavLink">
              About
            </Link>
            {isAuth && (
              <Link to="/timetable" className="NavLink">
                Timetable
              </Link>
            )}
          </Stack>

          {/* <Box
            sx={{
              flexGrow: 1,
              color: "inherit",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button href="news" sx={{ color: "inherit" }}>
              News
            </Button>
            <Button href="about" sx={{ color: "inherit" }}>
              About
            </Button>
          </Box> */}

          {isAuth ? (
            <UserMenu />
          ) : (
            <Button href="signin" sx={{ color: "inherit" }}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
