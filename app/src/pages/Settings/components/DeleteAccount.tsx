import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface DeleteAccountProps {
  onDeleteAccount: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ onDeleteAccount }) => {
  return (
    <Box sx={{ marginBottom: '32px' }}>
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>
        Usuń konto
      </Typography>
      <Button variant="contained" color="error" onClick={onDeleteAccount}>
        Usuń konto
      </Button>
    </Box>
  );
};

export default DeleteAccount;
