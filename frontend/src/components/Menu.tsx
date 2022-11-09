import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
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
import { useContext } from 'react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { ColorModeContext, ColorModeContextProvider } from '../contexts/layout'


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
  const [openMyProfile, setOpenMyProfile] = useState(false)

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
    setOpenMyProfile(true)
  }
  const handleProfileClose = () => {
    setOpenMyProfile(false)
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

  const colorMode = useContext(ColorModeContext);

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
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
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
        <MyProfile openMyProfile={openMyProfile} handleProfileClose={handleProfileClose} />
        <PostForm form={form} handleFormClose={handleFormClose} />
  
      </Box>
    </ThemeProvider>
  )
}
