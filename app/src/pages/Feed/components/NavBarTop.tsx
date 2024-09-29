import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const NavBarTop: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="welcomeLogo.png"
            alt="Logo"
            sx={{
              height: '2.5rem',
              maxWidth: 'auto',
              width: 'auto',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarTop;
