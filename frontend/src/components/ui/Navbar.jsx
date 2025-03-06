import React from "react";
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ title, onMenuClick }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#2D2D2D", // Dark Gray
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div" sx={{ color: "#fff" }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
