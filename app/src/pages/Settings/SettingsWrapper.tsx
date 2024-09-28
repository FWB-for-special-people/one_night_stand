import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ProfileEdit from './components/ProfileEdit';
import PasswordChange from './components/PasswordChange';
import DeleteAccount from './components/DeleteAccount';
import ThemeSwitcher from './components/ThemeSwitcher';

const Settings: React.FC = () => {
  const [avatar, setAvatar] = useState('https://example.com/avatar.jpg');
  const [name, setName] = useState('Patryk Bombik');

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    console.log('Zmiana hasła z:', oldPassword, 'na:', newPassword);
  };

  const handleDeleteAccount = () => {
    console.log('Konto zostało usunięte.');
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <Typography variant="h4" sx={{ marginBottom: '24px' }}>
        Ustawienia profilu
      </Typography>

      <ProfileEdit
        avatar={avatar}
        name={name}
        onNameChange={setName}
        onAvatarChange={setAvatar}
      />

      <ThemeSwitcher />

      <PasswordChange onPasswordChange={handlePasswordChange} />

      <DeleteAccount onDeleteAccount={handleDeleteAccount} />
    </Box>
  );
};

export default Settings;
