import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const drawerWidth = 240;

// Define sidebar items with proper structure
const sidebarItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, route: '/dashboard' },
  { 
    text: 'Payment Systems', 
    icon: <PaymentIcon />, 
    subItems: [
      { text: 'Payments', icon: <PaymentIcon />, route: '/payments' },
      { text: 'Invoices', icon: <ReceiptIcon />, route: '/invoices' },
      { text: 'Refunds', icon: <AssignmentReturnIcon />, route: '/refunds' }
    ]
  },
  { text: 'SLA', icon: <AssessmentIcon />, route: '/SLA' },
];

export default function Sidebar({ isOpen, toggleDrawer }) {
  const [openSubmenu, setOpenSubmenu] = React.useState({});
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Toggle submenu open/close state
  const handleSubmenuToggle = (text) => {
    setOpenSubmenu(prev => ({
      ...prev,
      [text]: !prev[text]
    }));
  };

  // Handle navigation for items with routes
  const handleNavigation = (route) => {
    navigate(route);
    if (isSmallScreen) {
      toggleDrawer();
    }
  };

  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'persistent'}
      open={isOpen}
      onClose={toggleDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
          borderRight: '1px solid #e0e0e0'
        },
      }}
    >
      <Box
        sx={{ 
          mt: '64px', 
          height: `calc(100vh - 64px)`, 
          overflow: 'auto',
          padding: '8px 0'
        }}
        role="presentation"
      >
        <List>
          {sidebarItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => 
                    item.subItems 
                      ? handleSubmenuToggle(item.text) 
                      : handleNavigation(item.route)
                  }
                  sx={{
                    borderRadius: '8px',
                    margin: '0 8px',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontWeight: 'medium'
                    }}
                  />
                  {item.subItems && (
                    openSubmenu[item.text] ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>

              {item.subItems && (
                <Collapse in={openSubmenu[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((sub) => (
                      <ListItem key={sub.text} disablePadding>
                        <ListItemButton 
                          onClick={() => handleNavigation(sub.route)}
                          sx={{ 
                            pl: 4,
                            borderRadius: '8px',
                            margin: '0 8px',
                            '&:hover': {
                              backgroundColor: '#e8f5e9',
                            }
                          }}
                        >
                          <ListItemIcon sx={{ color: 'success.main' }}>
                            {sub.icon}
                          </ListItemIcon>
                          <ListItemText primary={sub.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
      </Box>
    </Drawer>
  );
}