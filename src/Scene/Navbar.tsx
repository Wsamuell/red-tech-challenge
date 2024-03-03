import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BackGroungImg from '../Assets/bg.png';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';

const NavBar = () => {
  return (
    <AppBar
      color="transparent"
      position="static"
      style={{
        boxShadow: 'none',
        borderBottom: `2px solid #e0e0e0`,
        marginBottom: 10,
      }}
    >
      <Toolbar variant="dense" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <IconButton
          aria-label="menu"
          color="inherit"
          edge="start"
          sx={{ margin: 0.1 }}
        >
          <img
            alt="backgroundImg"
            height="auto"
            src={BackGroungImg}
            width="30"
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
