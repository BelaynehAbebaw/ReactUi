import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EcxLogo from '../../assets/images/EcxLogo.jpg';
import { Snackbar, Alert } from '@mui/material';
import { registerNotification } from '../services/notificationService';
import { useNavigate } from 'react-router-dom';

export default function Header({ toggleDrawer }) {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [menuAnchor, setMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const username = (typeof window !== 'undefined' && (localStorage.getItem('username') || localStorage.getItem('user')))
    || 'User';

  useEffect(() => {
    // Register the callback so API calls can trigger notifications
    registerNotification(setNotification);
  }, []);

  const handleClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Remove any stored user info keys commonly used
        localStorage.removeItem('username');
        localStorage.removeItem('user');
      }
      navigate('/');
    } finally {
      handleMenuClose();
    }
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

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }} aria-controls={Boolean(menuAnchor) ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={Boolean(menuAnchor) ? 'true' : undefined}>
                <Avatar sx={{ width: 32, height: 32 }} alt={username}>
                  {String(username).charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={menuAnchor}
              id="account-menu"
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem disabled>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                {username}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
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
