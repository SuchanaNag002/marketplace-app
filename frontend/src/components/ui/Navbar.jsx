import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const drawerWidth = "13rem"; 

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xs: "100%", sm: `calc(100% - ${drawerWidth} - 1rem)` }, 
        ml: { sm: `${drawerWidth} + 1rem` }, 
        backgroundColor: "#2D2D2D",
        top: "4vh", 
        borderRadius: "20px",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          E-Marketplace Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
