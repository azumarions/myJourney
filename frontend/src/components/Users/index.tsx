import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { USER } from '../../types'
import Image from 'next/image'
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme } from '@mui/material';
import { PostContext } from '../../contexts/post';
import Link from 'next/link';

const Users: React.FC<USER> = ({ id, userProfile, name, img, statusMessage, description }) => {
  const { posts } = React.useContext(PostContext)
  const post = posts.filter((post) => post.userPost === userProfile)
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
      <List dense sx={{ width: 700, maxWidth: 700, bgcolor: 'background.paper' }}>
        <ListItem
          disablePadding
        >
          <ListItemButton onClick={handleClickOpen('paper')}>
            <ListItemAvatar>
              <Avatar sx={{ m: 1, width: 80, height: 80 }}
                alt={name}
                src={img}
              />
            </ListItemAvatar>
            <ListItemText primary={name}  />
          </ListItemButton>
        </ListItem>
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{name}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Avatar sx={{ m: 1, width: 350, height: 350, minWidth: 20 }}
            alt={name}
            src={img}
          />
          <p>{statusMessage}</p>
          <p>{description}</p>

          {post.map( post => (
            <div key={post.id}>
                <List>
                  <Link href={`/post/${post.id}`}>
                    <ListItem>
                      <ListItemAvatar>
                        <Image
                          alt={post.title}
                          src={post.img}
                          width={200}
                          height={200}
                        />
                      </ListItemAvatar>
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
export default Users