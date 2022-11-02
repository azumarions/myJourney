import Layout from '../components/Layout'
import { getAllPosts } from '../api/post'
import { GetStaticProps } from 'next'
import { POST } from '../types'
import ImageList from '@mui/material/ImageList';
import Post from '../components/Post';

interface STATICPROPS {
  posts: POST[]
}

const PostPage: React.FC<STATICPROPS> = ({ posts }) => {
    return (
      <Layout title="Posts">
        <ImageList sx={{ width: 500, height: 650 }}>  
          {posts && posts.map((post) => <Post key={post.id} {...post} />)}
        </ImageList>
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