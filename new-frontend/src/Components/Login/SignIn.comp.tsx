import React, { useState } from "react";
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
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { loginSuccess } from "./LoginSlice";
import { loginUser } from "./LoginAction";
import { AppDispatch, StoreState, FormEvent } from "../../types";

export default function SignIn() {
  // const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const loginState = useSelector((state: StoreState) => state.login);
  const userState = useSelector((state: StoreState) => state.user);

  // TODO: REMOVE!!! for test only!!!!
  const [email, setEmail] = useState("t@t.com");
  const [password, setPassword] = useState("pass");

  // useEffect(() => {
  //   if (sessionStorage.getItem("accessToken")) {
  //     loginSuccess();
  //     console.log("accessToken is present! loginSuccess");
  //     navigate("/timetable");
  //   }
  // }, [navigate]);

  const handleSubmit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    // console.log(event)
    // const data = new FormData(event.target as HTMLFormElement) ;
    // console.log(data)
    // const email = data.get("email") as string;
    // const password = data.get("password") as string;
    console.log(email, password)
    dispatch(loginUser(email, password));
  };

  return (
    <Container component="main" maxWidth="xs" className="ContainerLogin">
      <Paper elevation={3} className="PaperLogin">
        <Typography variant="h5">Sign in to DailySchool</Typography>
        <hr />
        {(loginState.error || userState.error) && (
          <Alert severity="error"> {loginState.error} </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
                position: "absolute",
                left: "49%",
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
