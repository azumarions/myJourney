import { GetStaticProps } from 'next'
import { getAllPosts } from '../api/post'
import Layout from '../components/Layout'
import PostIndex from '../components/PostIndex';
import { POST } from '../types'
import { Box, Divider, Grid, IconButton, InputBase } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram'
import PostForm from '../components/PostForm';
import PF from '../components/PF';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

interface PostType {
  staticPosts: POST[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

const PostPage: React.FC<PostType> = ({ staticPosts }) => {
  const { data: posts, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/post-list/`,
    fetcher,
    {
      fallbackData: staticPosts,
    }
  );
  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout title="Posts">
      <Box sx={{bgcolor: "white"}}>
      <Box
        component="form"
        method="POST"
        sx={{ display: 'flex', alignItems: 'center', border: 1, borderRadius: 10, ml: 2, mt: -5, mb: -2, width: "95%", }}
       >
        
        <IconButton color="primary" sx={{ p: '10px', m: -1, ml: 1, mr: 1 }} aria-label="directions">
            <TelegramIcon sx={{fontSize: 30 }} />
        </IconButton>
        <Box sx={{ m: -1, }}>Search</Box>
      </Box>
      <Box sx={{ width: '99%', margin: '20px auto' }}>
      {/* <PF postCreated={mutate} /> */}
        <Grid container spacing={0.2}>
          {posts && posts.map((post: POST) => (
            <React.Fragment key={post.id}>
                <PostIndex key={post.id} post={post} postDeleted={mutate} />
            </React.Fragment>
              ))}
        </Grid>
      </Box>
      </Box>
    </Layout>
  )
}
export default PostPage
  
export const getStaticProps: GetStaticProps = async () => {
  const staticPosts = await getAllPosts()

  return {
    props: { 
      staticPosts
    },
  }
}

// try {
    //   const res = await axios.post(
    //     `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post/`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `JWT ${cookie.get("access_token")}`,
    //       },
    //     }
    //   );
    //   setSelectPost({ id: res.data.id, userPost: res.data.userPost, title: res.data.title, description: res.data.description, img: res.data.img, });
    //   postCreated();
    // } catch {
    //   console.log("error");
    // }
