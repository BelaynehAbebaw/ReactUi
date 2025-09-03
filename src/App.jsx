import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Sidebar, { drawerWidth } from './components/sidebar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import appRoutes from './Routes.jsx';


function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isDrawerOpen, setIsDrawerOpen] = useState(!isSmallScreen);
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header toggleDrawer={toggleDrawer} />

      {/* Body */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: '64px', // AppBar height
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
       
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {appRoutes.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>

        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          p: 2,
          backgroundColor: 'black',
          color: 'white',
          textAlign: 'center',
        }}
      >
        © 2025 Payment and SLA System. All rights reserved.
      </Box>
    </Box>

  );
}

export default App;
