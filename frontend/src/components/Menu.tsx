import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import {
  styled,
  useTheme,
  createTheme,
  ThemeProvider,
} from '@mui/material/styles'
import * as React from 'react'
import Link from 'next/link'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, TextareaAutosize, TextField } from '@mui/material'

const drawerWidth = 200

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function Menu() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleFormOpen = () => {
    setForm(true);
  };

  const handleFormClose = () => {
    setForm(false);
  };

  const colorTheme = createTheme({
    palette: {
      secondary: {
        main: '#0A0909',
      },
    },
  })

  return (
    <ThemeProvider theme={colorTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="secondary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              My Journey
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader color="secondary">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <Link href={"/posts"}>
              <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                  <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="トップページ" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <List>
            <Link href={"/auth"}>
              <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                  <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="ログイン" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <List>
            <Link href={"/users"}>
              <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                  <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="ユーザー" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleFormOpen}>
                    <ListItemIcon>
                  <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="新規投稿" />
                </ListItemButton>
              </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
        <Dialog open={form} onClose={handleFormClose}>
        <DialogTitle>新規投稿</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="タイトル"
            type="text"
            fullWidth
            variant="standard"
          />
          <Input
            type="file"
            margin='dense'
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="概要"
            type="textarea"
            fullWidth
            variant="standard"
          /> */}
          <TextareaAutosize
            aria-label="概要"
            minRows={10}
            placeholder="概要"
            style={{ width: 400 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>戻る</Button>
          <Button onClick={handleFormClose}>投稿</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </ThemeProvider>
  )
}
