import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  TextField,
  CircularProgress,
  Paper,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginSuccess, loginPending, loginFail } from "./LoginSlice";
import AuthService from "../../Services/auth.service";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const userState = useSelector((state) => state.user);

  // TODO: REMOVE!!! for test only!!!!
  const [email, setEmail] = useState("t@t.com");
  const [password, setPassword] = useState("pass");

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      loginSuccess();
      console.log("accessToken is present! loginSuccess");
      navigate("/timetable");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(loginPending());

    try {
      await AuthService.login(data.get("email"), data.get("password"));

      dispatch(loginSuccess());
      navigate("/timetable");
    } catch (error) {
      console.log("LOGIN FORM ERROR: ", error);

      dispatch(loginFail(error.message));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "15px" }}>
        <Typography variant="h5" align="center">
          Sign in to DailySchool
        </Typography>
        <hr />
        {(loginState.error || userState.error) && (
          <Alert severity="error"> {loginState.error} </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/reset-pass" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}

          <Button
            disabled={loginState.isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {loginState.isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "40%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
          <hr />
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Home
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Create an account"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
