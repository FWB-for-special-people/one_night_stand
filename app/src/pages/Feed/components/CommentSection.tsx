import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useAxios } from 'src/hooks/useAxios.ts';
import { API } from 'src/constants/api_routes.ts';
import { useCardCommentsQuery } from 'src/queries/useCardCommentsQuery.ts';

interface CommentsSectionProps {
  postId: number;
}

interface Comment {
  id: number;
  text: string;
  createdBy: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const axios = useAxios();

  // Pobieramy komentarze przy użyciu custom hooka
  const { data: commentsData, refetch } = useCardCommentsQuery(postId);

  // Mapped comments przetwarza dane z API
  const mappedComments = commentsData?.pages?.flatMap(page =>
    page.results.map(comment => ({
      id: comment.id,
      text: comment.text,
      createdBy: comment.created_by,
    }))
  );

  const handleAddComment = async () => {
    try {
      const response = await axios.post(API.cardComments(postId), { text: newComment });
      if (response.status === 201) {
        // Po dodaniu komentarza, odświeżamy listę komentarzy
        refetch();
        setNewComment(''); // Czyścimy pole tekstowe
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: 'background.paper',
        borderRadius: '.5rem',
        width: '100%',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        Komentarze
      </Typography>

      {/* Formularz do dodania komentarza */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="Dodaj komentarz"
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Wyślij
        </Button>
      </Box>

      {/* Lista komentarzy */}
      {mappedComments?.length ? (
        mappedComments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              padding: '.5rem',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              marginBottom: '.5rem',
            }}
          >
            <Typography variant="body1">{comment.text}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {comment.createdBy}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Brak komentarzy.
        </Typography>
      )}
    </Box>
  );
};

export default CommentsSection;