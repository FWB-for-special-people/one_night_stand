import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DataAIDisplay from './components/DataAIDisplay.tsx';
import response from '../../assets/response.json';
import AddButton from './components/AddButton.tsx';
import SpeechToText from "src/pages/AddPost/components/SpeechToText.tsx";

const AddPost: React.FC = () => {
  const [postQuestionText] = useState('');
  const [backendAnswerText, setBackendAnswerText] = useState('');
  const [backendQuestionText, setBackendQuestionText] = useState('');
  const [backendImages, setBackendImages] = useState<string[]>([]);


  const handleSavePost = (isPublic: boolean) => {
    console.log('Tekst posta:', postQuestionText);
    console.log('Czy post jest publiczny?: ', isPublic);
  };


  const { answer, question, images_b64 } = response;

  useEffect(() => {
    const imageData = images_b64.map(
      (imageBase64) => `data:image/jpeg;base64,${imageBase64}`,
    );
    setBackendAnswerText(answer);
    setBackendQuestionText(question);
    setBackendImages(imageData);
  }, []);

  const addButtonDisabled = !answer || !question || !images_b64;

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '1.5rem' }}>
        Dodaj post
      </Typography>

      <SpeechToText />

      <DataAIDisplay
        backendAnswerText={backendAnswerText}
        backendQuestionText={backendQuestionText}
        backendImages={backendImages}
      />

      <AddButton onSave={handleSavePost} disabled={addButtonDisabled} />
    </Box>
  );
};

export default AddPost;
