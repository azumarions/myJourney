import { GetStaticProps, GetStaticPaths } from "next";
import { USER } from "../../types";
import Layout from "../../components/Layout";
import { getAllUsersId, getUser } from "../../api/users";
import { Avatar, Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, ImageListItem, ImageListItemBar, List, ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr"
import React, { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/post";
import Post from "../../components/PostIndex";
import Profile from "../../components/Profile";

type UserType = {
    id: number
    staticUser: USER
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

const UserDetail: React.FC<UserType> = ({ id, staticUser }) => {
  const router = useRouter();
  const { data: user, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/profile-detail/${id}`,
    fetcher,
    {
      fallbackData: staticUser,
    }
  );
  useEffect(() => {
    mutate();
  }, []);
  if (router.isFallback || !user) {
    return <div>Loading...</div>;
  }

  const { posts, setPosts } = useContext(PostContext)
  const filterPost = posts.filter((post) => post.userPost === user.userProfile)

  return (
    <Layout title={user.name}>
      <Grid container>
        <Grid item xs={12} sm={6} md={6} lg={5}>
          <Profile key={user.id} user={user} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={7}>
        <Divider sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none" }, }} />
        <Box sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, paddingTop: 1, textAlign: "center" }}>投稿一覧</Box>
        <Box sx={{ width: '99%', margin: '20px auto' }}>
                <Grid container spacing={0.2}>
            {filterPost && filterPost.map((post) => (
                <Post key={post.id} {...post} />
            ))}
            </Grid>
           </Box>
           </Grid>
        </Grid>
    </Layout>
  )
}

export default UserDetail

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllUsersId()
    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const staticUser = await getUser(ctx.params.id as string)
    console.log(staticUser)
    return {
        props: {
            id: staticUser.id,
            staticUser,
        },
        revalidate: 3,
    }
}