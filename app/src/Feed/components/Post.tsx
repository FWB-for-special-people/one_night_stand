import React, { useState } from 'react';
import { Box, Typography, IconButton, Button, useMediaQuery, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginX: '1rem',
        color: 'text.primary',
        height: isMobile ? '80vh' : '90vh',
        maxHeight: '90vh',
        width: isMobile ? '100%' : isCollapsed ? '90%' : '80%',
      }}
    >
      <Box
        sx={{
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
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          padding: '1rem',
        }}
      >
        <IconButton aria-label="like">
          <FavoriteIcon sx={{ color: 'secondary.main' }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: 'secondary.main' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Post;