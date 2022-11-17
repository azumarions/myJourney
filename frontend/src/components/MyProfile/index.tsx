import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, TextareaAutosize, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { PostContext } from '../../contexts/post'
import { ProfileContext } from '../../contexts/profile'
import Post from '../Post'
import Cookie from "universal-cookie";
import { textAlign } from '@mui/system'

const cookie = new Cookie();

type DIALOG = {
    openMyProfile: boolean
    handleProfileClose: () => void
}

const MyProfile: React.FC<DIALOG> = ({ openMyProfile, handleProfileClose}) => {
  const { editProfile, setEditProfile } = useContext(ProfileContext)
  const { posts } = useContext(PostContext)
  const [ edit, setEdit ] = useState(false)
  const [ editName, setEditName ] = useState<string>("")
  const [ editStatusMessage, setEditStatusMessage ] = useState<string>("")
  const [ editDescription, setEditDescription ] = useState<string>("")

    const onClick = () => {
        setEdit(!edit)
    }

    // const handleNameChange = (e) => {
    //   const name = e.target.value;
    //   if (name !== null) {
    //     setEditName(name);
    //   } else {
    //     setEditName(editProfile.name)
    //   }
    // };

    // const handleStatusMessageChange = (e) => {
    //   const statusMessage = e.target.value;
    //   if (statusMessage !== null) {
    //     setEditStatusMessage(statusMessage);
    //   } else {
    //     setEditStatusMessage(editProfile.statusMessage)
    //   }
    // };

    // const handleDescriptionChange = (e) => {
    //   const description = e.target.value;
    //   if (description !== null) {
    //     setEditDescription(description);
    //   } else {
    //     setEditDescription(editProfile.description)
    //   }
    // };

    const onSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/profile/${editProfile.id}/`,
        {
          method: "PUT",
          body: JSON.stringify({ name: editProfile.name, statusMessage: editProfile.statusMessage, description: editProfile.description }),
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
      setEditProfile({ ...editProfile, name: editProfile.name, statusMessage: editProfile.statusMessage, description: editProfile.description });
      // setEditProfile({ ...editProfile, name: "", statusMessage: "", description: "" });
      // setEditName(editName)
      // setEditStatusMessage(editStatusMessage)
      // setEditDescription(editDescription)
      setEdit(!edit)
    }

  const filterPost = posts.filter((post) => (
    post.userPost === editProfile.userProfile
  ))
  
  return (
    <Dialog open={openMyProfile} onClose={handleProfileClose}>
      <Grid container>
      <div>
        <Button onClick={onClick}>{!edit ? <p>edit</p> : <p>back</p>}</Button>
      </div>
      <div>
        {!edit ? null : <Button onClick={onSave}>save</Button>}
      </div>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* {myProfile.map((profile) => ( */}
          {/* <Profile key={editProfile.id} user={editProfile} /> */}
            <List key={editProfile.id}>  
            <ListItem>
              <Grid container alignItems='center' justifyContent='center' direction="column">
                <Avatar
                    sx={{ 
                      width: { xs: 150, sm: 180, md: 200, lg: 220 },
                      height: { xs: 150, sm: 180, md: 200, lg: 220 },
                      margin: 1,
                    }}
                    srcSet={`${editProfile.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={editProfile.name}
                    src={editProfile.img} >
                </Avatar>
                {editProfile.id}
                {!edit ? <Box sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, pt: 2, pb: 1 }}>{editProfile.name}</Box> : 
                <TextField 
                  margin="normal"
                  fullWidth
                  sx={{ ml: 1, flex: 1, fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, }}
                  // placeholder={editProfile.name}
                  variant="standard"
                  inputProps={{style: { fontSize: 18, textAlign: "center"}}}
                  value={editProfile.name}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, name: e.target.value })
                  }
                />
                }
                {!edit ? <Box sx={{ fontSize: { xs: 14, sm: 18, md: 20, lg: 23 }, pt: 2, pb: 1 }}>{editProfile.statusMessage}</Box> : 
                <TextField
                  margin="normal"
                  fullWidth
                  sx={{ ml: 1, flex: 1, fontSize: { xs: 14, sm: 18, md: 20, lg: 23 }, }}
                  // placeholder={editProfile.statusMessage}
                  variant="standard"
                  inputProps={{style: { fontSize: 14, textAlign: "center" }}}
                  value={editProfile.statusMessage}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, statusMessage: e.target.value })
                  }
                />
                }
                <Box sx={{ fontSize: { xs: 16, sm: 20, md: 22, lg: 25 }, padding: 0.5}}>概要</Box>
                {!edit ? <Box sx={{ fontSize: { xs: 12, sm: 16, md: 18, lg: 20 }, }}>{editProfile.description}</Box> : 
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  // placeholder={editProfile.description}
                  variant="standard"
                  inputProps={{style: { fontSize: 12 }}}
                  value={editProfile.description}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, description: e.target.value })
                  }
                />
                }
              </Grid>               
            </ListItem>
        </List>
          {/* ))} */}
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
