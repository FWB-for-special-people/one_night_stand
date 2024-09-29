import React from 'react';
import { Box } from '@mui/material';
import Post from 'src/pages/Feed/components/Post.tsx';
import { myPosts } from 'src/assets/myPosts.ts';
import { sharedPosts } from 'src/assets/sharedPosts.ts';

const allPosts = [...myPosts, ...sharedPosts];
const Dashboard: React.FC = () => {

  return (
    <Box>
      {allPosts?.map((post: any) => (
        <Box
          key={post.id}
          sx={{
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: '.5rem'
          }}
        >
          <Post image={post.image} text={post.text} userName={post.user} userId={post.id}/>
        </Box>
      ))}
    </Box>
  );
};

export default Dashboard;
