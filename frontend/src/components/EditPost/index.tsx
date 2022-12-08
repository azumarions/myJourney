import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import PostDialog from '../PostDialog';
import { POST } from '../../types';
import { Avatar, Box, Grid, TextField } from '@mui/material';
import { Dialog, DialogProps, DialogContent, DialogTitle } from '@mui/material';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Cookie from "universal-cookie";
import axios from 'axios';
import { PostContext } from '../../contexts/post';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

const cookie = new Cookie();

type PostType = {
  post: POST
}

const EditPost: React.FC<PostType> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const [editPost, setEditPost] = useState(false)
  const { selectPost, setSelectPost } = useContext(PostContext)
  
  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    setEditPost(!editPost)
    setSelectPost(post)
  }

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const onSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const formData = new FormData()
    console.log(formData.get('img'))

    try {
        const res = await axios.put(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post/${post.id}/`,
            formData,
            {
                headers: {
                    Authorization: `JWT ${cookie.get("access_token")}`,
                },
            }
        );
    } catch {
        console.log("error");
    }
  }

  return (
    <>
      <Grid item xs={12} sm={4} md={4} lg={4}>
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
                 <DeleteIcon />
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
        <DialogTitle id="scroll-dialog-title" sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, padding: 2, textAlign: "center" }}>
            <Grid container>
            <Grid item xs={3}>
                <IconButton onClick={onClick}>
                  {!editPost ? <EditIcon sx={{fontSize: { xs: 16, sm: 22, md: 24, lg: 26 }}} /> :
                    <ReplyAllIcon sx={{fontSize: { xs: 16, sm: 22, md: 24, lg: 26}}} />
                  }
                </IconButton>
                <IconButton onClick={onClick}>
                  {!editPost ? null : <DoneIcon sx={{fontSize: { xs: 16, sm: 22, md: 24, lg: 26 }}} />}
                </IconButton>
              </Grid>
              <Grid item xs={9}>
                {!editPost ? <Box sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, pt: 2, pb: 1 }}>{post.title}</Box> : 
                  <TextField
                  margin="normal"
                  fullWidth
                  sx={{ ml: 1, flex: 1, fontSize: { xs: 18, sm: 24, md: 26, lg: 28}, }}
                  variant="standard"
                  inputProps={{style: { fontSize: 18, textAlign: "center"}}}
                  value={selectPost.title}
                  onChange={(e) =>
                    setSelectPost({...selectPost, title: e.target.value})}
                  />
                }
              </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container alignItems='center' justifyContent='center' direction="column">
            <Image src={post.img} width={500} height={500} alt={post.title} />
            <Box sx={{ fontSize: { xs: 16, sm: 24, md: 26, lg: 28 }, padding: 2 }}>投稿詳細</Box>
            {!editPost ? <Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{post.description}</Box> :
            <TextField
                fullWidth
                multiline
                minRows={5}
                variant="standard"
                inputProps={{style: { fontSize: 12, textAlign: "center"}}}
                value={selectPost.description}
                onChange={(e) =>
                setSelectPost({...selectPost, description: e.target.value})}
            />
            }
          </Grid>
          <PostDialog key={post.id} postId={post.id} userPost={post.userPost} />
        </DialogContent>
      </Dialog>
    </>   
  )
}
export default EditPost