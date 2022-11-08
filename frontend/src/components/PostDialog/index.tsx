import Link from 'next/link';
import { Avatar, ListItem, ListItemAvatar, ListItemText, List, Box, TextField, Button, Typography, Divider, IconButton, InputBase, Paper, FormControl, TableContainer, Table, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CommentContext } from '../../contexts/comment';
import Cookie from "universal-cookie";
import { UserContext } from '../../contexts/user';
import TelegramIcon from '@mui/icons-material/Telegram';
import Like from '../Like';
import Comment from '../Comment';
import { ProfileContext } from '../../contexts/profile';

const cookie = new Cookie();

type PostDialogType = {
  postId: number
  userPost: number
}

const PostDialog: React.FC<PostDialogType> = ({ postId, userPost }) => {
  const { users } = useContext(UserContext)
  const { profile } = useContext(ProfileContext)

  const user = users.filter((user) => user.userProfile === userPost)

  // user.map((user) => <PostForm key={user.id} user={user}/>)

  return (
    <>
    {user && user.map((user) => (
      <List key={user.id}>  
        <ListItem>
          <Grid container alignItems='center'>
            {/* <Link href={`/user/${user.id}`}> */}
              <Avatar sx={{ m: 1, width: 50, height: 50, minWidth: 20, display: 'inline-block' }} alt={user.name} src={user.img} />           
              <ListItemText primary={user.name} sx={{ display: 'inline-block' }} />
            {/* </Link> */}
          </Grid>
        </ListItem>

        {profile.map((prof) => (
        <Like key={postId} postId={postId} userId={prof.userProfile} userPost={userPost} />    
        ))}
        {/* {profile.map((prof) => (
        <div key={prof.id}>
        <Like postId={postId} userId={prof.userProfile} userPost={userPost} />
        <p>{prof.name}</p>
        <p>{prof.userProfile}</p>
        </div>
        ))} */}
        <Comment postId={postId} />
        
      </List>
    ))}
    </>
  )
}

export default PostDialog
