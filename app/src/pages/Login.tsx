import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import BackButton from 'src/inputs/BackButton.tsx';

const Login: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        component="main"
        role="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        padding="16px"
        sx={{
          gap: '1rem',
          '&:focus': {
            outline: '2px solid #3f51b5', // WCAG focus state
          },
        }}
      >
        <Typography variant="h4">
          Zaloguj się
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          aria-label="Email"
          autoComplete="email"
        />
        <TextField
          label="Hasło"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          aria-label="Hasło"
          autoComplete="current-password"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          aria-label="Zaloguj"
        >
          Zaloguj
        </Button>
        <Typography variant="body2">
          {'Zapomniałeś hasła? kliknij '}
          <NavLink to="/login/password_reminder"
          >tutaj</NavLink>
          {' aby odzyskać hasło.'}
        </Typography>
        <BackButton />
      </Box>
    </Container>
  );
};

export default Login;
