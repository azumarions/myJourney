import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import PostDialog from '../PostDialog';
import { POST } from '../../types';
import { Avatar, Box, Grid } from '@mui/material';
import { Dialog, DialogProps, DialogContent, DialogTitle } from '@mui/material';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';

const PostIndex: React.FC<POST> = ({ id, userPost, title, img, description }) => {
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

  return (
    <>
      <Grid item xs={6} sm={6} md={4} lg={3}>
        <ImageListItem key={id}>
          <img
            src={`${img}?w=248&fit=crop&auto=format`}
            srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={title}
            loading="lazy"
            onClick={handleClickOpen('paper')}
          />
          <ImageListItemBar
            title={<Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{title}</Box>}
            subtitle={<Box sx={{ fontSize: { xs: 10, sm: 14, md: 14, lg: 16 }, }}>{description}</Box>}
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
        <DialogTitle id="scroll-dialog-title" sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, padding: 2, textAlign: "center" }}>{title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container alignItems='center' justifyContent='center' direction="column">
            <Image src={img} width={500} height={500} alt={title} />
            <Box sx={{ fontSize: { xs: 16, sm: 24, md: 26, lg: 28 }, padding: 2 }}>投稿詳細</Box>
            <Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{description}</Box>
          </Grid>
          <PostDialog key={id} postId={id} userPost={userPost} />
        </DialogContent>
      </Dialog>
    </>   
  )
}
export default PostIndex