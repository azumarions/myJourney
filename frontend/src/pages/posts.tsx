import { GetStaticProps } from 'next'
import { getAllPosts } from '../api/post'
import Layout from '../components/Layout'
import Post from '../components/PostIndex';
import { POST } from '../types'
import { Box, Grid } from '@mui/material';

interface PostType {
  posts: POST[]
}

const PostPage: React.FC<PostType> = ({ posts }) => {

  return (
    <Layout title="Posts">
      <Box sx={{ width: '99%', margin: '20px auto' }}>
        <Grid container spacing={0.2}>
          {posts.map((post) => <Post key={post.id} {...post} />)}
        </Grid>
      </Box>
    </Layout>
  )
}
export default PostPage
  
export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts()

  return {
    props: { 
      posts
    },
  }
}