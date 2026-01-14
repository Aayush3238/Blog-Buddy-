import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // global state (fixed boolean logic)
  const isLogin =
    useSelector((state) => state.isLogin) ||
    Boolean(localStorage.getItem("userId"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Tabs state (fixed)
  const [value, setValue] = useState(0);

  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      localStorage.clear();
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
          Blog Buddy 
          </Typography>

          {isLogin && (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}

            {isLogin && (
              <Button
                onClick={handleLogout}
                sx={{ margin: 1, color: "white" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
