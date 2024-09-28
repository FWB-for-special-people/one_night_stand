import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import Post from 'src/pages/Feed/components/Post.tsx';
import { API } from 'src/data/routes/api_routes.ts';

const Dashboard: React.FC = () => {

const {data: cards, isLoading: loadingCards} = useCards()

  console.log(cards)

  if (loadingCards) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {cards?.results?.map((post: any) => (
        <Box
          key={post.id}
          sx={{
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              fontSize: {
                xs: '.5rem',
                sm: '.7rem',
                md: '1rem',
              },
            }}
          >
            Udostępnione przez użytkownika: {post.created_by}
          </Typography>
          <Post image={post.image} text={post.text} />
        </Box>
      ))}
    </Box>
  );
};

export default Dashboard;

function useCards(){
  return useQuery({
    queryKey: ['allPosts'],
    queryFn: async () => {
      try {
        const res = await axios.get(API.cards);
        return res.data;
      } catch (error) {
        console.error(error);
        throw new Error('Error getting posts');
      }
    },
  });
}

// function usePageQueryParam() {
//
// }
