import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { FormEvent } from "../../types";

// TODO: validate passwords, add progress

export default function SignUp() {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  };

  return (
    <Container component="main" maxWidth="xs" className="ContainerLogin">
      <Paper elevation={3} className="PaperLogin">
        <Typography variant="h5">
          Sign up
        </Typography>
        <hr />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="dense"
            size="small"
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />

          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />

          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            name="password2"
            label="Repeat password"
            type="password"
            id="password2"
            autoComplete="new-password2"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <hr />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
