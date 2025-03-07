import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const LoadingState = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        p: 2,
        borderRadius: 1,
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto'
      }}
    >
      <svg width="0" height="0">
        <defs>
          <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#FFA333" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{
          mb: 2,
          color: 'transparent',
          '& .MuiCircularProgress-circle': {
            stroke: 'url(#spinnerGradient)',
          },
        }}
      />
      <Typography variant="h6" sx={{ color: '#777' }}>
        Fetching your products in a minute...
      </Typography>
    </Box>
  );
};

export default LoadingState;
