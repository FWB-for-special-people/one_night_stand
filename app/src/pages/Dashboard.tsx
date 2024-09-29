import { Box, Typography } from '@mui/material';
import Post from 'src/pages/Feed/components/Post.tsx';
import { myPosts } from 'src/assets/myPosts.ts';
import { sharedPosts } from 'src/assets/sharedPosts.ts';
import {useUserFollowers} from "src/queries/useUserFollowers.ts";

const allPosts = [...myPosts, ...sharedPosts];
export default function Dashboard() {
  // const {data} = useCardsQuery()
  useUserFollowers()

  return (
    <Box>
      {allPosts?.map((post: any) => (
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
