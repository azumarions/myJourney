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
  const { editProfile } = useContext(ProfileContext)

  const user = users.filter((user) => user.userProfile === userPost)

  return (
    <>
    {user && user.map((user) => (
      <List key={postId}>  
        <ListItem>
            <Link href={`/user/${user.id}`}>
              <Avatar 
                sx={{ 
                  width: { xs: 50, sm: 70, md: 75, lg: 80 },
                  height: { xs: 50, sm: 70, md: 75, lg: 80 },
                  margin: 1 
                }}
                alt={user.name} 
                src={user.img} />  
            </Link>
            <Link href={`/user/${user.id}`}>
              <Box sx={{ fontSize: { xs: 14, sm: 18, md: 20, lg: 22 }, }}>{user.name}</Box>
            </Link>
        </ListItem>
      
        {/* {myProfile.map((profile) => ( */}
          <React.Fragment key={editProfile.id}>
            <Like key={postId} postId={postId} userId={editProfile.userProfile} />
            <Comment postId={postId} />
          </React.Fragment>
        {/* ))} */}
      </List>
    ))}
    </>
  )
}

export default PostDialog
