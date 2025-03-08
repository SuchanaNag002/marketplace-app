import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Dialog = ({ open, onClose, title, children }) => {
  const gradientStyle = {
    background: "linear-gradient(45deg, #CC5500, #FFA333)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "semibold",
  };
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            ...gradientStyle,
            fontWeight: "700",
          }}
        >
          {title}
        </Typography>
        {/* Close (X) button at top-right */}
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>
    </MuiDialog>
  );
};

export default Dialog;
