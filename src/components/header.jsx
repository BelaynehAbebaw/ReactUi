import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import EcxLogo from '../assets/images/EcxLogo.jpg';
import { Snackbar, Alert } from '@mui/material';
import { registerNotification } from '../services/notificationService';

export default function Header({ toggleDrawer }) {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // Register the callback so API calls can trigger notifications
    registerNotification(setNotification);
  }, []);

  const handleClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1a552a' }}>
        <Toolbar>
          <div>
            <img src={EcxLogo} alt="ECX Logo" style={{ width: 50, height: 'auto' }} />
          </div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Payment and SLA System
          </Typography>
        </Toolbar>
             <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
      >
        <Alert severity={notification.severity} onClose={handleClose} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
      </AppBar>

 
    </>
  );
}
