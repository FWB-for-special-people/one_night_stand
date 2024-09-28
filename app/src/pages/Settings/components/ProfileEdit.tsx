import React from 'react';
import { Box, Avatar, Button, TextField, Typography } from '@mui/material';

interface ProfileEditProps {
  avatar: string;
  name: string;
  onNameChange: (newName: string) => void;
  onAvatarChange: (newAvatar: string) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({
  avatar,
  name,
  onNameChange,
  onAvatarChange,
}) => {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          onAvatarChange(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Box sx={{ marginBottom: '32px' }}>
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>
        Edytuj profil
      </Typography>

      <Avatar
        src={avatar}
        sx={{ width: 100, height: 100, marginBottom: '16px' }}
      />
      <Button variant="contained" component="label">
        Zmień awatar
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleAvatarChange}
        />
      </Button>

      <TextField
        label="Imię"
        variant="outlined"
        fullWidth
        sx={{ marginTop: '16px' }}
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
    </Box>
  );
};

export default ProfileEdit;
