import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import PostInput from './components/PostInput';
import DataAIDisplay from './components/DataAIDisplay.tsx';
import response from '../../assets/response.json';
import AddButton from './components/AddButton.tsx';

const AddPost: React.FC = () => {
  const [postQuestionText, setPostQuestionText] = useState('');
  const [backendAnswerText, setBackendAnswerText] = useState('');
  const [backendQuestionText, setBackendQuestionText] = useState('');
  const [backendImages, setBackendImages] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 500) {
      setPostQuestionText(e.target.value);
    }
  };

  const handleSpeechToText = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('API rozpoznawania mowy nie jest obsługiwane w tej przeglądarce.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'pl-PL';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (postQuestionText.length + transcript.length <= 3000) {
        setPostQuestionText((prevText) => prevText + ' ' + transcript);
      }
    };

    recognition.start();
  };

  const handleSavePost = (isPublic: boolean) => {
    console.log('Tekst posta:', postQuestionText);
    console.log('Czy post jest publiczny?: ', isPublic);
  };

  const sendQuestion = () => {
    const postData = {
      question: postQuestionText,
    };

    console.log(postData);
    // try {
    //   const response = await fetch('https://your-backend-url.com/api/posts', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(postData),
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error('Błąd podczas wysyłania posta do backendu');
    //   }
    //
    //   const data = await response.json();
    //   console.log('Odpowiedź z backendu:', data);
    //   alert('Post został pomyślnie zapisany!');
    // } catch (error) {
    //   console.error('Błąd:', error);
    //   alert('Wystąpił błąd podczas zapisywania posta.');
    // }
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

      <PostInput
        postText={postQuestionText}
        onTextChange={handleTextChange}
        onSpeechToText={handleSpeechToText}
        isRecording={isRecording}
        sendQuestion={sendQuestion}
      />

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
