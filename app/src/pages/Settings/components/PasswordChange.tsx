import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface PasswordChangeProps {
  onPasswordChange: (oldPassword: string, newPassword: string) => void;
}

const PasswordChange: React.FC<PasswordChangeProps> = ({
  onPasswordChange,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      onPasswordChange(oldPassword, newPassword);
    } else {
      console.log('Hasła się nie zgadzają!');
    }
  };

  return (
    <Box sx={{ marginBottom: '32px' }}>
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>
        Zmień hasło
      </Typography>

      <TextField
        label="Aktualne hasło"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '16px' }}
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <TextField
        label="Nowe hasło"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: '16px' }}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <TextField
        label="Potwierdź nowe hasło"
        type="password"
        variant="outlined"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '16px' }}
        onClick={handleSubmit}
      >
        Zmień hasło
      </Button>
    </Box>
  );
};

export default PasswordChange;
