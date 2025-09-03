// components/Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import EcxLogo from '../assets/images/EcxLogo.jpg';
import { Snackbar, Alert } from '@mui/material';

export default function Header({ toggleDrawer, notification, onCloseNotification }) {
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
      </AppBar>

      {/* Notification Snackbar positioned relative to header */}
   <Snackbar
  open={notification?.open || false}
  autoHideDuration={6000}
  onClose={onCloseNotification}
  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
  sx={{ 
    position: 'fixed',
    top: '80px',
    left: '20px',
    zIndex: (theme) => theme.zIndex.drawer + 2
  }}
>
  <Alert 
    severity={notification?.severity || 'info'}
    onClose={onCloseNotification}
    sx={{ width: '100%' }}
  >
    {notification?.message || ''}
  </Alert>
</Snackbar>

    </>
  );
}