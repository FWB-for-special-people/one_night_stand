import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const NavBarBottomMobile: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'primary.main' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton component={Link} to="/" aria-label="feed">
          <HomeIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton component={Link} to="/categories" aria-label="categories">
          <CategoryIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton component={Link} to="/my-profile" aria-label="my feed">
          <AccountCircleIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton component={Link} to="/settings" aria-label="settings">
          <SettingsIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton component={Link} to="/add-post" aria-label="add post">
          <AddCircleIcon sx={{ color: 'secondary.main', fontSize: 40 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarBottomMobile;