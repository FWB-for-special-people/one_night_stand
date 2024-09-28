import React, { useState } from 'react';
import { Box, Typography, IconButton, Button, useMediaQuery, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store.ts';

interface PostProps {
  image: string;
  text: string;
}

const Post: React.FC<PostProps> = ({ image, text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isCollapsed = useSelector((state: RootState) => state.ui.isCollapsed);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '1rem',
        pb: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginX: '1rem',
        color: 'text.primary',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        height: isMobile ? '80vh' : '90vh',
        maxHeight: '90vh',
        width: isMobile ? '100%' : isCollapsed ? '90%' : '80%',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          borderRadius: '1rem',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '80vh',
          width: '100%',
        }}
      />
      <Box
        sx={{
          width: '100%',
          padding: '1rem',
          fontSize: {
            xs: '.7rem',
            sm: '1rem',
            md: '1.5rem',
          },
          display: !isExpanded ? 'flex' : 'column',
        }}
      >
        {!isExpanded ? (
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'
            }}
          >
            {text}
          </Typography>
        ) : (
          <Typography>{text}</Typography>
        )}

        <Button
          onClick={handleToggleExpand}
          sx={{
            textTransform: 'none',
            padding: 0,
            minWidth: 0,
            textAlign: 'right',
          }}
        >
          {isExpanded ? 'zwiń' : ' więcej'}
        </Button>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3rem',
          paddingRight: '1rem',
        }}
      >
        <IconButton>
          <MessageIcon sx={{ color: 'secondary.main', fontSize: '2.5rem' }} />
        </IconButton>
        <IconButton aria-label="like">
          <FavoriteIcon sx={{ color: 'secondary.main', fontSize: '2.5rem' }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: 'secondary.main', fontSize: '2.5rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Post;