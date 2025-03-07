import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyState = () => {
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
      <Typography variant="h6" sx={{ color: '#777' }}>
        Oops! No products to show. Start by adding your products.
      </Typography>
    </Box>
  );
};

export default EmptyState;
