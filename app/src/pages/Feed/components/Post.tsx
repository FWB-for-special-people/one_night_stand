import React from 'react';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import { useAtom } from 'jotai';
import { darkModeAtom, isSideMenuCollapsedAtom } from 'src/atoms.ts';
import { Avatar } from 'src/pages/Feed/components/Avatar.tsx';

interface PostProps {
  image: string;
  text: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
}

const Post: React.FC<PostProps> = ({ image, text,userName, userAvatar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSideMenuCollapsed] = useAtom(isSideMenuCollapsedAtom);
  const [isDarkMode] = useAtom(darkModeAtom);

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? 'background.paper' : 'background.default',
        borderRadius: '.25rem',
        padding: '.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary',
        boxShadow: '.05rem .05rem .05rem .05rem rgba(0, 0, 0, 0.4)',
        width: isMobile ? '100%' : isSideMenuCollapsed ? '90%' : '80%',
        border: '1px solid black',
      }}
    >
      <Box
        sx={{
          borderRadius: '.25rem',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '60vh',
          width: '100%',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          margin: '.5rem',
          paddingLeft: '.2rem',
        }}>
        <Avatar name={userName} avatar={userAvatar} />
        <Typography
          sx={{
              color: 'text.primary',
              fontSize: '1rem',
            paddingLeft: '.5rem',
            }}
        >
          {userName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          paddingX: '.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            color: 'text.primary',
            fontSize: {
              xs: '.9rem',
              sm: '1.2rem',
              md: '1.5rem',
            },
          }}
        >
          {text}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          paddingRight: '1rem',
          width: '100%',
        }}
      >
        <IconButton aria-label="like">
          <FavoriteIcon sx={{ color: isDarkMode? 'text.primary' : 'primary.main', fontSize: '1.5rem' }} />
        </IconButton>
        <IconButton>
          <MessageIcon sx={{ color: isDarkMode? 'text.primary' : 'primary.main', fontSize: '1.5rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Post;
