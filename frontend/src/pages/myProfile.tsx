import Layout from '../components/Layout'
import { ProfileContext } from '../contexts/profile'
import { Avatar, Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, ImageListItem, ImageListItemBar, List, ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr"
import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/post";
import Post from "../components/Post";
import { profile } from 'console';
import Profile from '../components/Profile';
import PostIndex from '../components/PostIndex';

const myProfilePage: React.FC = () => {
  const { myProfile, setMyProfile} = useContext(ProfileContext)
  const { posts, setPosts } = useContext(PostContext)
  // const filterPost = posts.filter((post) => post.userPost === user.userProfile)

  const filterPost = posts.filter((post) => (
    myProfile.map((prof) => prof.userProfile === post.userPost
  )))

  return (
    <>
      <Layout title="MyProfile">
      <Grid container>
        <Grid item xs={12} sm={6} md={6} lg={5}>
          {myProfile && myProfile.map((profile) => (
            <Profile key={profile.id} user={profile} />
          ))}
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={7}>
        <Divider sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none" }, }} />
        <Box sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, paddingTop: 1, textAlign: "center" }}>投稿一覧</Box>
        <Box sx={{ width: '99%', margin: '20px auto' }}>
          <Grid container spacing={0.2}>
            {filterPost && filterPost.map((post) => (
                <PostIndex key={post.id} {...post} />
            ))}
          </Grid>
           </Box>
          </Grid>
        </Grid>
      
    </Layout>
    </>
  )
}

export default myProfilePage