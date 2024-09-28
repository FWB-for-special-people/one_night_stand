// src/components/UserProfile.tsx
import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

interface UserProfileProps {
  nickname: string;
  avatar: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ nickname, avatar }) => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
      {/* Awatar */}
      <Avatar
        alt={nickname}
        src={avatar}
        sx={{ width: 100, height: 100, margin: '0 auto' }}
      />
      {/* Nickname */}
      <Typography variant="h5" sx={{ marginTop: '16px', fontWeight: 'bold' }}>
        {nickname}
      </Typography>
    </Box>
  );
};

export default UserProfile;
