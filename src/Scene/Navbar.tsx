import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      style={{
        boxShadow: 'none',
        borderBottom: `2px solid #e0e0e0`,
        marginBottom: 10,
      }}
    >
      <Toolbar variant="dense" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <MenuIcon />

          {/* Replace this icon with Red-tech logo if you can find a PNG */}
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Home
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
