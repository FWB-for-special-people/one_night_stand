import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleGoBack}
      sx={{
        marginBottom: '16px',
      }}
    >
      Wróć
    </Button>
  );
};

export default BackButton;
