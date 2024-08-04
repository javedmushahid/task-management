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
import { saveUser } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const userData = {
        ...formData,
        password: base64_encode(formData.password),
      };
      delete userData.confirmPassword;
      saveUser(userData);
      login(userData);
      navigate("/tasks");
    } else {
      alert("Passwords do not match");
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
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
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
              autoComplete="new-password"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Link href="/login" variant="body2">
              {"Already have an account? Sign in"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
