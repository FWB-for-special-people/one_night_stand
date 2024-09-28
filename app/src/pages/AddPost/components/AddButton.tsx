import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';

interface AddButtonProps {
  onSave: (isPublic: boolean) => void;
  disabled: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({ onSave, disabled }) => {
  const [isPublic, setIsPublic] = useState(true);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const handleSavePost = () => {
    onSave(isPublic);
  };

  return (
    <Box
      sx={{
        display: disabled ? 'none' : 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginY: '1.5rem',
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={isPublic}
            onChange={handleCheckboxChange}
            color="primary"
            disabled={disabled}
          />
        }
        label="Publikuj publicznie"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSavePost}
        disabled={disabled}
      >
        Dodaj post
      </Button>
    </Box>
  );
};

export default AddButton;
