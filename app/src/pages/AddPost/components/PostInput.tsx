import React from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

interface PostInputProps {
  postText: string;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSpeechToText: () => void;
  sendQuestion: () => void;
  isRecording: boolean;
}

const PostInput: React.FC<PostInputProps> = ({
  postText,
  onTextChange,
  onSpeechToText,
  sendQuestion,
  isRecording,
}) => {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        label="Treść posta"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={postText}
        onChange={onTextChange}
      />
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8 }}
        color={isRecording ? 'primary' : 'default'}
        onClick={onSpeechToText}
      >
        <MicIcon />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="caption"
          sx={{ display: 'block', marginTop: '8px' }}
        >
          {postText.length} / 500 znaków
        </Typography>
        <Button onClick={sendQuestion}>Generuj odpowiedź</Button>
      </Box>
    </Box>
  );
};

export default PostInput;
