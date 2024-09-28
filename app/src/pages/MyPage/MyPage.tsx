import React from 'react';
import { Box, Typography } from '@mui/material';
import Post from 'src/Feed/components/Post.tsx';
import { myPosts } from 'src/assets/myPosts.ts';
import { sharedPosts } from 'src/assets/sharedPosts.ts';
import UserProfile from 'src/pages/MyPage/components/UserProfile.tsx';

const user = {
  nickname: 'jan_kowalski',
  avatar: 'https://example.com/avatar.jpg',
};

const allPosts = [...myPosts, ...sharedPosts].sort((a, b) => {
  return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
});

const MyPage: React.FC = () => {
  return (
    <Box sx={{ padding: '16px' }}>
      <UserProfile nickname={user.nickname} avatar={user.avatar} />

      <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '32px' }}>
        Moje i Udostępnione posty
      </Typography>

      {allPosts.length > 0 ? (
        allPosts.map((post) => (
          <Box key={post.id} sx={{ marginBottom: '24px' }}>
            {sharedPosts.some((sharedPost) => sharedPost.id === post.id) && (
              <Typography variant="subtitle2" color="textSecondary">
                Udostępnione od użytkownika: {post.user}
              </Typography>
            )}
            <Post image={post.image} text={post.text} userId={post.user} userName={post.user} userAvatar={post.image}/>
          </Box>
        ))
      ) : (
        <Typography variant="body1" sx={{ marginTop: '16px' }}>
          Brak postów do wyświetlenia
        </Typography>
      )}
    </Box>
  );
};

export default MyPage;
