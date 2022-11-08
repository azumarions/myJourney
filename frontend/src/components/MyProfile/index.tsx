import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemAvatar, ListItemText, TextareaAutosize, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { ProfileContext } from '../../contexts/profile'

type DIALOG = {
    myProfile: boolean
    handleProfileClose: () => void
}

const MyProfile: React.FC<DIALOG> = ({ myProfile, handleProfileClose}) => {
  const { profile, setProfile } = useContext(ProfileContext)
  
  return (
    <Dialog open={myProfile} onClose={handleProfileClose}>
      
        <DialogTitle>プロフィール</DialogTitle>
        {profile.map((prof) => (
        <DialogContent>
          <DialogContentText>
          </DialogContentText> 
            <Avatar sx={{ m: 1, width: 350, height: 350, minWidth: 20 }}
              alt={prof.name}
              src={prof.img}
            />
          <DialogActions>
            <Button onClick={handleProfileClose}>戻る</Button>
            </DialogActions>
        </DialogContent>
        ))}
    </Dialog>
  )
}

export default MyProfile
