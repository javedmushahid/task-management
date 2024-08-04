import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { encode as base64_encode } from "base-64";
import { getUser } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = getUser();
    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === base64_encode(formData.password)
    ) {
      login(storedUser);
      navigate("/tasks");
    } else {
      alert("Invalid credentials. Please register first.");
      navigate("/register");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link href="/register" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
