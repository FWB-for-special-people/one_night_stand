import { Box } from '@mui/material';
import Post from 'src/pages/Feed/components/Post.tsx';
import { useCardsQuery } from 'src/queries/useCardsQuery.ts';

export default function Dashboard() {
  const { data: cardsData } = useCardsQuery()

  const mappedCards = cardsData?.pages?.flatMap(page => page.map(post => ({
    id: post.id,
    text: post.text,
    createdBy: post.created_by,
    createdAt: post.created_at,
    likeCount: post.like_count,
    viewCount: post.view_count,
    imageUrl: post.image.image,
  })))

  return (
    <Box>
      {mappedCards?.map((post: any, postIndex: any) => (
        <Box
          key={post.id + postIndex}
          sx={{
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: '.5rem',
          }}
        >
          <Post image={post?.imageUrl} text={post?.text} userName={post?.createdBy} />
        </Box>
      ))}
    </Box>
  );
};
