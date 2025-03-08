import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(Alert)(({ theme }) => ({
  margin: theme.spacing(1),
  width: '100%',
  maxWidth: '600px',
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
    fontSize: '0.875rem',
  },
  transition: 'all 0.3s ease-in-out',
}));

const AlertComponent = ({ severity, message, title, ...props }) => {
  const defaultMessages = {
    success: 'This is a success Alert.',
    info: 'This is an info Alert.',
    warning: 'This is a warning Alert.',
    error: 'This is an error Alert.',
  };

  const displayMessage = message || defaultMessages[severity] || 'No message provided';
  const displayTitle = title || severity.charAt(0).toUpperCase() + severity.slice(1);

  return (
    <StyledAlert
      severity={severity}
      variant="filled"
      {...props}
    >
      <AlertTitle>{displayTitle}</AlertTitle>
      {displayMessage}
    </StyledAlert>
  );
};

export default AlertComponent;