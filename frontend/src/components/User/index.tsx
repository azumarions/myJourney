import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import PostDialog from '../PostDialog';
import { POST, USER } from '../../types';
import { Avatar, Box, Divider, Grid } from '@mui/material';
import { Dialog, DialogProps, DialogContent, DialogTitle } from '@mui/material';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import Profile from '../Profile';
import { PostContext } from '../../contexts/post';
import Post from '../Post';

type UserType = {
  user: USER
}

const User: React.FC<UserType> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const { posts, setPosts } = useContext(PostContext)
  // const filterPost = posts.filter((post) => post.userPost === user.userProfile)

  const filterPost = posts.filter((post) => post.userPost === user.userProfile)
  
  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <ImageListItem key={user.id}>
        <Avatar 
          sx={{ 
            width: { xs: 50, sm: 70, md: 75, lg: 80 },
            height: { xs: 50, sm: 70, md: 75, lg: 80 },
            margin: 1 
          }}
          src={`${user.img}?w=248&fit=crop&auto=format`}
          srcSet={`${user.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={user.name}
          onClick={handleClickOpen('paper')} 
        />
        <Box sx={{ fontSize: { xs: 14, sm: 18, md: 20, lg: 22 }, }}>{user.name}</Box>
        </ImageListItem>
      </Grid> 
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Grid container>  
        <Grid item xs={12} sm={12} md={12} lg={12}>
            <Profile key={user.id} user={user} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Divider sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none" }, }} />
          {/* <Box sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, paddingTop: 1, textAlign: "center" }}>投稿一覧</Box> */}
          <Box sx={{ width: '99%', margin: '20px auto' }}>
            <Grid container spacing={0.2}>
              {filterPost && filterPost.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      </Dialog>
    </>   
  )
}
export default User