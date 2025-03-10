import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "./Searchbar"

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
        px: { xs: 1, sm: 2 },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: { xs: "space-between", sm: "space-between" },
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2 },
          alignItems: "center",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            mr: 1,
            color: "#FFA333",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h4"
          sx={{
            ...gradientStyle,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Dashboard
        </Typography>
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            maxWidth: { xs: "100%", sm: "300px" },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;