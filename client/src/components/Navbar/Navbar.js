import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!", { autoClose: 2000 });
    setOpenSnackbar(true);
    setAnchorEl(null);
    navigate("/");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    navigate("/");
  };

  const menuItems = [
    { text: "Tasks", href: "/tasks" },
    { text: "Profile", href: "/profile" },
    { text: "Logout", onClick: handleLogout },
  ];

  if (!user) {
    return null;
  }

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          WorldRef
        </Typography>
        <Avatar
          src={user.profilePicture}
          alt="Profile Picture"
          sx={{ width: 40, height: 40, mr: 2, cursor: "pointer" }}
          onClick={() => navigate("/profile")}
        />

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  maxHeight: 400,
                  width: "auto",
                },
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    }
                    handleMenuClose();
                  }}
                  component={item.href ? "a" : "div"}
                  href={item.href || undefined}
                >
                  {item.text}
                </MenuItem>
              ))}
              <MenuItem onClick={handleMenuClose}>
                <IconButton color="inherit">
                  <CloseIcon />
                </IconButton>
                Close
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                href={item.href}
                onClick={item.onClick}
                sx={{ mx: 1 }}
              >
                {item.text}
              </Button>
            ))}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
