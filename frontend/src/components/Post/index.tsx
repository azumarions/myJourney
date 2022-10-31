import Image from 'next/image'
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme } from '@mui/material';
import { getAllUsers } from '../../api/users';
import { PostContext } from '../../contexts/post';
import { USER } from '../../types';
import { TestContext } from '../../contexts/auth';

interface POST {
  id: number
  userPost: string
  title: string
  img: string
  description: string
}

const Post: React.FC<POST> = ({ id, userPost, title, img, description}) => {
  const { users } = React.useContext(TestContext)
  const user = users.filter((user) => user.userProfile === userPost)
  console.log(user);
  // const u = user.map( u => (<span key={u.id}>{u.name}</span>))
  // const user = users.find(user => user.userId === userPost)
  // users && users.map((user) => {user.id, user.name})
  // const user = users.find((user) => {
  //   return user.userProfile === userPost;
  // });
  

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      {/* <Container maxWidth="xs"> */}
        {/* <ImageList sx={{ width: 800, cols: 3}}> */}
        <ImageListItem sx={{ gap: 0}}>
          <img
            src={`${img}?w=248&fit=crop&auto=format`}
            srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={title}
            loading="lazy"
            onClick={handleClickOpen('paper')}
          />
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
              {/* <p>{description}</p> */}
              {user.map( u => (<span key={u.id}>{u.name}</span>))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>back</Button>
              <Button onClick={handleClose}>liked</Button>
            </DialogActions>
          </Dialog>
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
      {/* </ImageList> */}
      {/* </Container> */}
    </ThemeProvider>
            
  )
}
export default Post