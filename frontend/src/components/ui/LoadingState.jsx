import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const LoadingState = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        p: 2,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px'
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6">
        Pulling up your products in a minute...
      </Typography>
    </Box>
  );
};

export default LoadingState;
