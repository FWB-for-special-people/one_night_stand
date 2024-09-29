import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useAxios } from 'src/hooks/useAxios.ts';
import { API } from 'src/constants/api_routes.ts';
import { useCardCommentsQuery } from 'src/queries/useCardCommentsQuery.ts';
import { useAtom } from 'jotai';
import { darkModeAtom } from 'src/atoms.ts';

interface CommentsSectionProps {
  postId: number;
}

interface Comment {
  id: number;
  text: string;
  createdBy: number;
  createdAt: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const axios = useAxios();

  const [isDarkMode] = useAtom(darkModeAtom);

  const { data: commentsData, refetch } = useCardCommentsQuery(postId);

  const mappedComments = commentsData?.pages?.flatMap(page =>
    page.results.map(comment => ({
      id: comment.id,
      text: comment.text,
      createdBy: comment.created_by,
      createdAt: comment.created_at,
    })) as Comment[],
  );

  const handleAddComment = async () => {
    try {
      const response = await axios.post(API.cardComments(postId), { text: newComment });
      if (response.status === 201) {
        refetch();
        setNewComment('');
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
        borderRadius: '.25rem',
        width: '100%',
        border: '.5px solid black',
      }}
    >
      <Typography
        sx={{
          marginBottom: '1rem',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}>
        Komentarze
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="Dodaj komentarz"
          variant="outlined"
          sx={{
            backgroundColor: 'background.default',
          }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Wyślij
        </Button>
      </Box>

      {mappedComments?.length ? (
        mappedComments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              padding: '.5rem',
              border: '.5px solid black',
              borderRadius: '.25rem',
              marginBottom: '.5rem',
              backgroundColor: 'background.default',
            }}
          >
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? 'text.primary' : 'secondary.main.',
                    borderBottom: isDarkMode ? '.5px solid white' : '.5px solid black',
                    fontSize: '.5rem',
                  }}>
                  {comment.createdBy}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? 'text.primary' : 'primary.main',
                    borderBottom: isDarkMode ? '.5px solid white' : '.5px solid black',
                    fontSize: '.5rem',
                  }}>
                  {formatDate(comment.createdAt)}
                </Typography>
              </Box>
              <Typography
                sx={{
                  marginTop: '.5rem',
                  fontWeight: 'bold',
                  fontSize: '.8rem',
                }}>{comment.text}</Typography>
            </Box>
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