import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import PostDialog from '../PostDialog';
import { POST } from '../../types';
import { Avatar, Box, Grid } from '@mui/material';
import { Dialog, DialogProps, DialogContent, DialogTitle } from '@mui/material';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import { KeyedMutator } from 'swr';
import Cookie from "universal-cookie";

const cookie = new Cookie();

type PostType = {
  post: POST
  postDeleted: KeyedMutator<any>
}
const PostIndex: React.FC<PostType> = ({ post, postDeleted }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  
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

  const Delete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post/${post.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${cookie.get("access_token")}`,
      },
    });
    postDeleted()
  }

  return (
    <>
      <Grid item xs={6} sm={4} md={3} lg={2.4}>
        <ImageListItem key={post.id}>
          <img
            src={`${post.img}?w=248&fit=crop&auto=format`}
            srcSet={`${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={post.title}
            loading="lazy"
            onClick={handleClickOpen('paper')}
          />
          <ImageListItemBar
            title={<Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{post.title}</Box>}
            subtitle={<Box sx={{ fontSize: { xs: 10, sm: 14, md: 14, lg: 16 }, }}>{post.description}</Box>}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${post.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, padding: 2, textAlign: "center" }}>{post.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container alignItems='center' justifyContent='center' direction="column">
            <Image src={post.img} width={500} height={500} alt={post.title} />
            <Box sx={{ fontSize: { xs: 16, sm: 24, md: 26, lg: 28 }, padding: 2 }}>投稿詳細</Box>
            <Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{post.description}</Box>
          </Grid>
          <PostDialog key={post.id} postId={post.id} userPost={post.userPost} />
        </DialogContent>
      </Dialog>
    </>   
  )
}
export default PostIndex