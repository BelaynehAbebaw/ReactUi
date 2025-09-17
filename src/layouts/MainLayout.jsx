import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/organisms/Header.jsx';
import Sidebar, { drawerWidth } from '../components/organisms/Sidebar.jsx';
import Footer from '../components/organisms/Footer.jsx';

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(!isSmallScreen);

  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header toggleDrawer={toggleDrawer} />

      {/* Body */}
      <Box sx={{ display: 'flex', flexGrow: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <Sidebar isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
            mt: '64px', // header height
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
