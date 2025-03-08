import React, { useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const StyledAlert = styled(Alert)(({ theme, severity }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: "auto",
  maxWidth: "400px",
  margin: 0,
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    fontSize: "0.875rem",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  transition: "all 0.3s ease-in-out",
  "& .MuiAlert-icon": {
    color: ({ severity }) => ({
      success: "#90EE90 !important",
      error: "#FFB6C1 !important",
      warning: "#FFFF99 !important",
      info: "#ADD8E6 !important",
    })[severity],
  },
  "& .MuiAlert-message": {
    color: ({ severity }) => ({
      success: "#90EE90 !important",
      error: "#FFB6C1 !important",
      warning: "#FFFF99 !important",
      info: "#ADD8E6 !important",
    })[severity],
  },
  "& .MuiAlertTitle-root": {
    color: ({ severity }) => ({
      success: "#90EE90 !important",
      error: "#FFB6C1 !important",
      warning: "#FFFF99 !important",
      info: "#ADD8E6 !important",
    })[severity],
  },
  backgroundColor: ({ severity }) => ({
    success: "#1A3C1A",
    error: "#401414",
    warning: "#4A3C1A",
    info: "#1A2C3C",
  })[severity],
}));

const AlertComponent = ({ severity, message, title, onClose, ...props }) => {
  const defaultMessages = {
    success: "This is a success Alert.",
    info: "This is an info Alert.",
    warning: "This is a warning Alert.",
    error: "This is an error Alert.",
  };

  const displayMessage = message || defaultMessages[severity] || "No message provided";
  const displayTitle = title || severity.charAt(0).toUpperCase() + severity.slice(1);

  const getIcon = () => {
    switch (severity) {
      case "success":
        return <CheckCircleOutlineIcon fontSize="inherit" />;
      case "error":
        return <ErrorOutlineIcon fontSize="inherit" />;
      case "warning":
        return <WarningAmberIcon fontSize="inherit" />;
      case "info":
        return <InfoOutlinedIcon fontSize="inherit" />;
      default:
        return null;
    }
  };

  // Auto-close the alert after 4 seconds
  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <StyledAlert
      severity={severity}
      variant="filled"
      icon={getIcon()}
      onClose={onClose}
      {...props}
    >
      <AlertTitle>{displayTitle}</AlertTitle>
      {displayMessage}
    </StyledAlert>
  );
};

export default AlertComponent;
