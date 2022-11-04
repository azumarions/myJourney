import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import { UserContext } from '../../contexts/user';
import PostDialog from '../PostDialog';
import { POST } from '../../types';
import { Box, Grid } from '@mui/material';
import { Dialog, DialogProps, DialogContent, DialogTitle } from '@mui/material';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';

const Post: React.FC<POST> = ({ id, userPost, title, img, description }) => {
  const { users } = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const user = users.filter((user) => user.userProfile === userPost)
  // console.log(user);
  
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
      <Grid item xs={6} sm={4} lg={3}>
        <ImageListItem key={img}>
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
          {user && user.map((user) => <PostDialog key={user.id} {...user} />)}
        </DialogContent>
      </Dialog>
    </>   
  )
}
export default Post