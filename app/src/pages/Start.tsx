import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const btnStyle = {
  margin: '1rem auto',
  width: '20rem',
};

const StartScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '16px',
        textAlign: 'center',
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src="src/assets/welcomeLogo.png"
        alt="Logo"
        sx={{
          width: '150px',
          marginBottom: '32px',
        }}
      />

      <Typography variant="h4" sx={{ marginBottom: '24px' }}>
        Witamy w Aplikacji!
      </Typography>

      <Button variant="contained" color="primary" sx={btnStyle} href="/login">
        Zaloguj się
      </Button>
    </Box>
  );
};

export default StartScreen;
