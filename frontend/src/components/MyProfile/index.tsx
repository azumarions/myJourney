import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, TextareaAutosize, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { PostContext } from '../../contexts/post'
import { ProfileContext } from '../../contexts/profile'
import Post from '../Post'
import Profile from '../Profile'
import Cookie from "universal-cookie";
import { NoEncryption, NoMeals } from '@mui/icons-material'

const cookie = new Cookie();

type DIALOG = {
    openMyProfile: boolean
    handleProfileClose: () => void
}

const MyProfile: React.FC<DIALOG> = ({ openMyProfile, handleProfileClose}) => {
  const { myProfile, setMyProfile} = useContext(ProfileContext)
  const { selectPost, setSelectPost, posts, setPosts } = useContext(PostContext)
  const [ edit, setEdit ] = useState(false)

    const onClick = () => {
        setEdit(!edit)
    }

  const filterPost = posts.filter((post) => (
    myProfile.map((prof) => prof.userProfile === post.userPost
  )))

  const update = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${myProfile.map((profile) => profile.id)}/`,
      {
        method: "PUT",
        body: JSON.stringify({ name: myProfile.map((profile) => profile.name) }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setMyProfile([]);
  };
  
  return (
    <Dialog open={openMyProfile} onClose={handleProfileClose}>
      {/* <DialogTitle>プロフィール</DialogTitle> */}
      <Grid container>
      <div>
        <Button onClick={onClick}>edit</Button>
      </div>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {myProfile.map((profile) => (
            // <Profile key={profile.id} user={profile} />
            <List key={profile.id}>  
            <ListItem>
              <Grid container alignItems='center' justifyContent='center' direction="column">
                <Avatar
                    sx={{ 
                      width: { xs: 150, sm: 180, md: 200, lg: 220 },
                      height: { xs: 150, sm: 180, md: 200, lg: 220 },
                      margin: 1,
                    }}
                    srcSet={`${profile.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={profile.name}
                    src={profile.img} >
                </Avatar>
                {!edit ? <Box sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, pt: 2, pb: 1 }}>{profile.name}</Box> : 
                <TextField 
                margin="normal"
                  fullWidth
                  sx={{ ml: 1, flex: 1, fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, }}
                  defaultValue={profile.name}
                  variant="standard"
                  inputProps={{style: { fontSize: 18 }}}
                />
                }
                {!edit ? <Box sx={{ fontSize: { xs: 14, sm: 18, md: 20, lg: 23 }, pt: 2, pb: 1 }}>{profile.statusMessage}</Box> : 
                <TextField
                  margin="normal"
                  fullWidth
                  sx={{ ml: 1, flex: 1, fontSize: { xs: 14, sm: 18, md: 20, lg: 23 }, }}
                  defaultValue={profile.statusMessage}
                  variant="standard"
                  inputProps={{style: { fontSize: 14 }}}
                />
                }
                <Box sx={{ fontSize: { xs: 16, sm: 20, md: 22, lg: 25 }, padding: 0.5}}>概要</Box>
                {!edit ? <Box sx={{ fontSize: { xs: 12, sm: 16, md: 18, lg: 20 }, }}>{profile.description}</Box> : 
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  defaultValue={profile.description}
                  variant="standard"
                  inputProps={{style: { fontSize: 12 }}}
                  // value={profile.name}
                  // onChange={(e) => {
                  //   setSelectPost({ ...myProfile, title: e.target.value })
                // }}
                />
                }
              </Grid>               
            </ListItem>
        </List>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Divider sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none" }, }} />
          <Box sx={{ fontSize: { xs: 16, sm: 20, md: 22, lg: 25 }, paddingTop: 1, textAlign: "center" }}>投稿一覧</Box>
          <Box sx={{ width: '99%', margin: '20px auto' }}>
            <Grid container spacing={0.2}>
              {filterPost && filterPost.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default MyProfile
