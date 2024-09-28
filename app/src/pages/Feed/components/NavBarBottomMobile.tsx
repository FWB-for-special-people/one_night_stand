import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const NavBarBottomMobile: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton aria-label="feed" href="/">
          <HomeIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton aria-label="categories" href="/categories">
          <CategoryIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton aria-label="add post" size="large" href="/add-post">
          <AddCircleIcon
            sx={{
              color: 'white',
              fontSize: 80,
              position: 'absolute',
              transform: 'translatey(-20%)',
              backgroundColor: 'secondary.main',
              borderRadius: '20rem',
            }}
          />
        </IconButton>
        <IconButton aria-label="my feed" href="/my-profile">
          <AccountCircleIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton aria-label="settings" href="/settings">
          <SettingsIcon sx={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarBottomMobile;