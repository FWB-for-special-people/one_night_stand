import React from 'react';
import { Box, Typography } from '@mui/material';
import Post from 'src/pages/Feed/components/Post.tsx';
import { myPosts } from 'src/assets/myPosts.ts';
import { sharedPosts } from 'src/assets/sharedPosts.ts';

interface PostsByCategoryProps {
  category: string;
}

const PostsByCategory: React.FC<PostsByCategoryProps> = ({ category }) => {
  const allPosts = [...myPosts, ...sharedPosts];
  const filteredPosts = allPosts.filter((post) => post.category === category);

  return (
    <Box>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Box key={post.id} sx={{ marginBottom: '24px' }}>
            {sharedPosts.some((sharedPost) => sharedPost.id === post.id) && (
              <Typography variant="subtitle2" color="textSecondary">
                Udostępnione od użytkownika: {post.user}
              </Typography>
            )}
            <Post image={post.image} text={post.text}/>
          </Box>
        ))
      ) : (
        <Typography variant="body1">
          Brak postów dla kategorii {category}
        </Typography>
      )}
    </Box>
  );
};

export default PostsByCategory;
