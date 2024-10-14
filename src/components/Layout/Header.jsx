import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ toggleSidebar }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h1">Veci App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
