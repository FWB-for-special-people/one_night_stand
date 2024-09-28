import React from 'react';
import { Box, Typography } from '@mui/material';

interface BackendDataDisplayProps {
  backendAnswerText: string;
  backendQuestionText: string;
  backendImages: string[];
}

const DataAIDisplay: React.FC<BackendDataDisplayProps> = ({
  backendAnswerText,
  backendQuestionText,
  backendImages,
}) => {
  return (
    <Box sx={{ marginTop: '1.5rem' }}>
      <Typography
        variant="h6"
        sx={{ marginBottom: '1rem', fontWeight: 'bold' }}
      >
        {backendQuestionText ? `Twoje pytanie: ${backendQuestionText}` : ''}
      </Typography>
      <Typography variant="body1">
        {backendAnswerText ? backendAnswerText : ''}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem',
          marginBottom: '1rem',
        }}
      >
        {backendImages
          ? backendImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  width: '80%',
                }}
              >
                <img
                  src={image}
                  alt={`Obrazek ${index + 1}`}
                  style={{ width: '100%' }}
                />
              </Box>
            ))
          : ''}
      </Box>
    </Box>
  );
};

export default DataAIDisplay;
