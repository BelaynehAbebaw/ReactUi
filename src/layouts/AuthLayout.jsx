import React from 'react';
import Box from '@mui/material/Box';

const AuthLayout = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
      p: 2,
    }}
  >
    {children}
  </Box>
);

export default AuthLayout;
