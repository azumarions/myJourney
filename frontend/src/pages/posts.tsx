import Layout from '../components/Layout'
import { getAllPosts } from '../api/post'
import { GetStaticProps } from 'next'
import { POST } from '../types'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import Post from '../components/Post';

interface STATICPROPS {
  posts: POST[]
}

const PostPage: React.FC<STATICPROPS> = ({ posts }) => {
    return (
      <Layout title="Blog">
        <ImageList sx={{ width: 500, height: 650 }}>
          {/* <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">POST</ListSubheader>
          </ImageListItem> */}
         
          {posts && posts.map((post) => <Post key={post.id} {...post} />)}
        </ImageList>
      </Layout>
    )
  }
  export default PostPage
  
  export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllPosts()
    return {
      props: { posts },
    }
  }