import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyState = () => {
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
      <Typography variant="h6" sx={{ color: 'text.secondary' }}>
        Oops! No products to show! Start by adding your products.
      </Typography>
    </Box>
  );
};

export default EmptyState;
