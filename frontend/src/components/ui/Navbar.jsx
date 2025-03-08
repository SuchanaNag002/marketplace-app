import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

const drawerWidth = "13rem";

const Navbar = ({ onSearchChange, handleDrawerToggle, searchQuery }) => {
  const gradientStyle = {
    background: "linear-gradient(45deg, #CC5500, #FFA333)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "semibold",
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xs: "100%", sm: `calc(100% - ${drawerWidth} - 1rem)` },
        ml: { sm: `${drawerWidth} + 1rem` },
        backgroundColor: "transparent",
        boxShadow: "none",
        top: "2vh",
        borderRadius: "20px",
        transition: "opacity 0.3s ease-in-out", 
        opacity: 1, 
      }}
    >
      <Toolbar sx={{ justifyContent: { xs: "space-between", sm: "space-between" }, flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h4" sx={gradientStyle}>
          Dashboard
        </Typography>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;