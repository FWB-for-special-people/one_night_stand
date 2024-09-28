import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const NavBarTop: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="src/assets/welcomeLogo.png"
            alt="Logo"
            sx={{
              height: '3.5rem',
              maxWidth: 'auto',
              width: 'auto',
            }}
          />
        </Box>
        <Typography variant="h6" component="div">
          Azeno
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarTop;
