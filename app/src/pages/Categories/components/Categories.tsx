import React from 'react';
import { Box, Button } from '@mui/material';

interface CategoryButtonsProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <Box sx={{ marginBottom: '16px' }}>
      {categories.map((category) => (
        <Button
          key={category}
          variant="contained"
          sx={{ marginRight: '8px', marginBottom: '8px' }}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryButtons;
