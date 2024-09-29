import React from 'react';
import { Box, Typography } from '@mui/material';
import { myPosts } from 'src/assets/myPosts.ts';
import { sharedPosts } from 'src/assets/sharedPosts.ts';
import Post from 'src/pages/Feed/components/Post.tsx';

const allPosts = [...myPosts, ...sharedPosts].sort((a, b) => {
  return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
});

const Dashboard: React.FC = () => {
  return (
    <Box>
      {allPosts.map((post) => (
        <Box
          key={post.id}
          sx={{
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {sharedPosts.some((sharedPost) => sharedPost.id === post.id) && (
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontSize: {
                  xs: '.5rem',
                  sm: '.7rem',
                  md: '1rem',
                },
              }}
            >
              Udostępnione przez użytkownika: {post.user}
            </Typography>
          )}
          <Post image={post.image} text={post.text} userId={post.user} userName={post.user} userAvatar={post.image}/>
        </Box>
      ))}
    </Box>
  );
};

export default Dashboard;
