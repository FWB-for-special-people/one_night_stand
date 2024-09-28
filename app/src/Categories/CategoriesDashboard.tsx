import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CategoryButtons from './components/Categories.tsx';
import PostsByCategory from './components/PostByCategories.tsx';
import { myPosts } from '../../assets/myPosts.ts';
import { sharedPosts } from '../../assets/sharedPosts.ts';

const categories = Array.from(
  new Set([...myPosts, ...sharedPosts].map((post) => post.category)),
);

const PostsDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h4" sx={{ marginBottom: '24px' }}>
        Wybierz kategorię
      </Typography>

      <CategoryButtons
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />

      {selectedCategory ? (
        <PostsByCategory category={selectedCategory} />
      ) : (
        <Typography variant="body1">
          Wybierz kategorię, aby zobaczyć posty.
        </Typography>
      )}
    </Box>
  );
};

export default PostsDashboard;
