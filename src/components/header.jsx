
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import EcxLogo from '../assets/images/EcxLogo.jpg';
export default function Header({ toggleDrawer }) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , backgroundColor: '#1a552a;'}}>
      <Toolbar>
        <div> <img src={EcxLogo} alt="ECX Logo" style={{ width: 50, height: 'auto' }} /></div>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2}} // show only on small screens
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div">
          Payment and SLA System
        </Typography>
        {/* ... search bar and icons remain ... */}
      </Toolbar>
    </AppBar>
  );
}
