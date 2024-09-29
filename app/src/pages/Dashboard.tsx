import { Box } from '@mui/material';
import Post from 'src/pages/Feed/components/Post.tsx';
import { useCardsQuery } from 'src/queries/useCardsQuery.ts';

export default function Dashboard() {
  const { data: cardsData } = useCardsQuery()

  return (
    <Box>
      {cardsData?.pages?.map((post: any) => (
        <Box
          key={post.id}
          sx={{
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: '.5rem',
          }}
        >
          <Post image={post.image} text={post.text} userName={post.user} userId={post.id} />
        </Box>
      ))}
    </Box>
  );
};
