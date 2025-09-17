import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import EcxLogo from '../../assets/images/EcxLogo.jpg';
import { registerNotification } from '../../services/notificationService';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = ({ toggleDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    registerNotification(setNotification);
  }, []);

  const handleCloseNotification = () => setNotification(prev => ({ ...prev, open: false }));

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleUserMenuClick = (setting) => {
    setAnchorElUser(null); // close menu

    if (setting === 'Logout') {
      // Clear auth state
      dispatch(clearAuth());
      localStorage.removeItem('token');

      // Redirect to login
      navigate('/login', { replace: true });
    } else if (setting === 'Dashboard') {
      navigate('/dashboard');
    } else if (setting === 'Profile') {
      navigate('/profile');
    } else if (setting === 'Account') {
      navigate('/account');
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1a552a' }}>
        <Toolbar>
          <Box sx={{ width: 200 }}>
            <img src={EcxLogo} alt="ECX Logo" style={{ width: 50, height: 'auto' }} />
          </Box>

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

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Payment and SLA System
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleUserMenuClick(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
      >
        <Alert severity={notification.severity} onClose={handleCloseNotification} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
