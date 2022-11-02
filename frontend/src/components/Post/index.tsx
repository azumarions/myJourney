import Image from 'next/image'
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme, Avatar, ListItem, ListItemAvatar, ListItemText, List, DialogContentText, Typography, Box } from '@mui/material';
import { UserContext } from '../../contexts/user';
import Link from 'next/link';

interface POST {
  id: number
  userPost: string
  title: string
  img: string
  description: string
}

const Post: React.FC<POST> = ({ id, userPost, title, img, description}) => {
  const { users } = React.useContext(UserContext)
  const user = users.filter((user) => user.userProfile === userPost)
  // console.log(user);

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
    <>
      <ThemeProvider theme={theme}>
        <ImageListItem sx={{ gap: 0}}>
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
      </ThemeProvider>
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
              {user.map( user => (
                <div key={user.id}>
                <List>
                  <Link href={`/user/${user.id}`}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ m: 1, width: 50, height: 50, minWidth: 20 }}
                          alt={user.name}
                          src={user.img}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={user.name}/>
                    </ListItem>
                  </Link>
                </List>
                </div>
              ))}             
        </DialogContent>
      </Dialog>
    </>     
  )
}
export default Post