import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(user);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData({ ...profileData, profilePicture: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(profileData);
    toast.success("Profile updated successfully!", { autoClose: 2000 });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          My Profile
        </Typography>
        <Box sx={{ position: "relative", mb: 2 }}>
          <Avatar
            src={profileData.profilePicture}
            alt="Profile Picture"
            sx={{ width: 100, height: 100 }}
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleUpload}
            style={{ display: "none" }}
            id="profile-picture-upload"
          />
          <label htmlFor="profile-picture-upload">
            <IconButton
              component="span"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "background.paper",
                borderRadius: "50%",
              }}
            >
              <CameraAlt />
            </IconButton>
          </label>
        </Box>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={profileData.name}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={profileData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                value={profileData.phone}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
