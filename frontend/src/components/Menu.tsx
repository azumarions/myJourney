import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
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
import PostForm from './PostForm'
import MyProfile from './MyProfile'
import { useState } from 'react'
import Cookie from "universal-cookie";
import { useRouter } from "next/router";


const cookie = new Cookie();

const drawerWidth = 230

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
  const router = useRouter();
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(false)
  const [myProfile, setMyProfile] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleFormOpen = () => {
    setForm(true)
  }
  const handleFormClose = () => {
    setForm(false)
  }
  const handleProfileOpen = () => {
    setMyProfile(true)
  }
  const handleProfileClose = () => {
    setMyProfile(false)
  }

  const colorTheme = createTheme({
    palette: {
      secondary: {
        main: '#0A0909',
      },
    },
  })

  const logout = () => {
    cookie.remove("access_token");
    router.push("/");
  };

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
                <ListItemButton onClick={handleProfileOpen}>
                    <ListItemIcon>
                  <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="プロフィール" />
                </ListItemButton>
              </ListItem>      
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
          <List>
              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                    <ListItemIcon>
                  <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="ログアウト" />
                </ListItemButton>
              </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
        <MyProfile myProfile={myProfile} handleProfileClose={handleProfileClose} />
        <PostForm form={form} handleFormClose={handleFormClose} />
  
      </Box>
    </ThemeProvider>
  )
}
