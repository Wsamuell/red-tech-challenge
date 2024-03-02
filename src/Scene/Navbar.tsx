import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BackGroungImg from '../Assets/bg.png';

const NavBar = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
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
          sx={{ margin: 0.1 }}
        >
          <img
            src={BackGroungImg}
            alt="backgroundImg"
            width="30"
            height="auto"
          />
        </IconButton>
        <Typography variant="h6" color="grey" component="div">
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
