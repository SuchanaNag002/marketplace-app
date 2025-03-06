import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton
} from "@mui/material";

const Dialog = ({ open, onClose, title, children, onConfirm }) => {
  return (
    <MuiDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: "black", color: "white" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "white", color: "black" }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "black" }}>
        <MuiButton onClick={onClose} sx={{ color: "white" }}>
          Cancel
        </MuiButton>
        {onConfirm && (
          <MuiButton
            onClick={onConfirm}
            variant="contained"
            sx={{ backgroundColor: "white", color: "black" }}
          >
            Confirm
          </MuiButton>
        )}
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
