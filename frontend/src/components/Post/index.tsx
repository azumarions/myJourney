import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import { UserContext } from '../../contexts/user';
import { CommentContext } from '../../contexts/comment';
import PostDialog from '../PostDialog';
import { POST } from '../../types';
import { Avatar, Box, Grid } from '@mui/material';
import { Dialog, DialogProps, DialogContent, DialogTitle } from '@mui/material';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import { PostContext } from '../../contexts/post';

const Post: React.FC<POST> = ({ id, userPost, title, img, description }) => {
  const { users } = useContext(UserContext)
  const { comments, setComment } = useContext(CommentContext)
  const { postId, setPostId } = useContext(PostContext)
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const user = users.filter((user) => user.userProfile === userPost)
  // console.log(user);

  const comment = comments.filter((comment) => comment.post === id)
  
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

  // const onClick = (e) => {
  //   setPostId(e.currentTarget.key)
  // }

  // postId && console.log(postId)

  return (
    <>
      <Grid item xs={6} sm={4} lg={3}>
        <ImageListItem key={id}>
          <img
            src={`${img}?w=248&fit=crop&auto=format`}
            srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={title}
            loading="lazy"
            onClick={handleClickOpen('paper')}
          />
          <ImageListItemBar
            title={title}
            subtitle={description}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${title}`}
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
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>             
          <Image src={img} width={400} height={400} alt={title} />
          <Box fontSize={16}>{description}</Box>   
          {user && user.map((user) => <PostDialog key={user.id} id={user.id} postId={id} name={user.name} img={user.img} />)}
          {comment.map((comment) => (
            <div key={comment.id}>
              <Avatar
                src={
                  users.find(
                    (user) => user.userProfile === comment.comment
                  )?.img
                }
              />
                  {
                    users.find(
                      (user) => user.userProfile === comment.comment
                    )?.name
                  }
                {comment.sentence}
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>   
  )
}
export default Post