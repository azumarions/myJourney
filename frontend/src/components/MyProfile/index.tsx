import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemAvatar, ListItemText, TextareaAutosize, TextField } from '@mui/material'
import { ppid } from 'process';
import React, { useContext } from 'react'
import Cookie from "universal-cookie";
import { PostContext } from '../../contexts/post';
import { ProfileContext } from '../../contexts/profile'

const cookie = new Cookie();

type DIALOG = {
    myProfile: boolean
    handleProfileClose: () => void
}

const MyProfile: React.FC<DIALOG> = ({ myProfile, handleProfileClose}) => {
  const { profile, setProfile } = useContext(ProfileContext)
  const { posts, setPosts } = useContext(PostContext)
  // const post = posts.filter((post) => post.userPost === profile.userProfile)

  // console.log(user);
  
  return (
    <Dialog open={myProfile} onClose={handleProfileClose}>
        <DialogTitle>プロフィール</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          {/* <Avatar sx={{ m: 1, width: 350, height: 350 }}
                alt={profile.name}
                src={profile.img}
              /> */}
              {profile.map( p => (
                <div key={p.id}>             
                        <Avatar sx={{ m: 1, width: 350, height: 350, minWidth: 20 }}
                          alt={p.name}
                          src={p.img}
                        />
                </div>
              ))}
          <DialogActions>
            <Button onClick={handleProfileClose}>戻る</Button>
            </DialogActions>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleFormClose}>戻る</Button>
          <Button onClick={handleFormClose}>投稿</Button>
        </DialogActions> */}
    </Dialog>
  )
}

export default MyProfile
