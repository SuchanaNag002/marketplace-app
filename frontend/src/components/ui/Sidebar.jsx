import React from "react";
import { Drawer, Box } from "@mui/material";

const drawerWidth = "13rem";

const Sidebar = ({ drawerContent, mobileOpen, onClose }) => {
  return (
    <>
      {/* Temporary drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#2D2D2D",
            color: "#FFFFFF",
            borderRadius: "1rem",
            margin: "0.5rem",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Permanent drawer for larger screens */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#2D2D2D",
              color: "#FFFFFF",
              borderRadius: "1rem",
              margin: "0.5rem",
              height: "calc(100vh - 4vh - 1rem)",
              marginTop: "4vh", 
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
