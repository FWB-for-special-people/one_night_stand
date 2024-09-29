import React, { useState } from 'react';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageIcon from '@mui/icons-material/Message';
import { useAtom } from 'jotai';
import { darkModeAtom, isSideMenuCollapsedAtom } from 'src/atoms.ts';
import { Avatar } from 'src/pages/Feed/components/Avatar.tsx';
import { useAxios } from 'src/hooks/useAxios.ts';
import { API } from 'src/constants/api_routes.ts';

interface PostProps {
  id: number;
  image: string;
  text: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
}

const Post: React.FC<PostProps> = ({ id, image, text, userName='Użytkownik Anonimowy' }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSideMenuCollapsed] = useAtom(isSideMenuCollapsedAtom);
  const [isDarkMode] = useAtom(darkModeAtom);
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const axios = useAxios();

  const handleLike = async () => {
    try {
      const response = await axios.patch(API.cardLike(id));
      if (response.status === 200) {
        setIsLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = () => {
    setIsComment(!isComment);
  }

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

        <Avatar avatar={image}  name={userName} />
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
            borderTop: '1px solid black',
            marginTop: '0.625rem'
        }}
      >
        <IconButton aria-label="like" onClick={handleLike}>
          {isLiked ?
            <FavoriteIcon sx={{ color: isDarkMode ? 'text.primary' : 'primary.main', fontSize: '1.5rem' }} />
            :
            <FavoriteBorderIcon sx={{ color: isDarkMode ? 'text.primary' : 'primary.main', fontSize: '1.5rem' }} />}
        </IconButton>
        <IconButton aria-label="commentary" onClick={handleComment}>
          <MessageIcon sx={{ color: isDarkMode ? 'text.primary' : 'primary.main', fontSize: '1.5rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Post;
