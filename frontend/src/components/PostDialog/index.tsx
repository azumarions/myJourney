import Link from 'next/link';
import { Avatar, ListItem, ListItemAvatar, ListItemText, List, Box, TextField, Button, Typography, Divider, IconButton, InputBase, Paper, FormControl, TableContainer, Table, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CommentContext } from '../../contexts/comment';
import Cookie from "universal-cookie";
import { UserContext } from '../../contexts/user';
import { COMMENT } from '../../types';
import { getAllComments } from '../../api/comment';
import { Directions } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TelegramIcon from '@mui/icons-material/Telegram';
import Like from '../Like';

const cookie = new Cookie();

type PostDialogType = {
  postId: number
  userPost: number
}

const PostDialog: React.FC<PostDialogType> = ({ postId, userPost}) => {
  const { comments, setComments } = useContext(CommentContext)
  const { users } = useContext(UserContext)
  const [ id, setId ] = useState<number>(0)
  const [ sentence, setSentence ] = useState<string>("")

  const user = users.filter((user) => user.userProfile === userPost)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setComments([...comments, { id: id, sentence: sentence }]);
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/comment/`, {
          method: "POST",
          body: JSON.stringify({ sentence: sentence, post: postId }),
          headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
          },
      }).then((res) => {
          if (res.status === 401) {
          alert("JWT Token not valid");
          }
      });
      // setComments([...comments, {id: 0, sentence: "" }]);
  }
  return (
    <>
    {user && user.map((user) => (
      <List key={user.id}>
        
          <ListItem>
            <Link href={`/user/${user.id}`}>
            <ListItemAvatar>         
              <Avatar sx={{ m: 1, width: 50, height: 50, minWidth: 20 }}
                alt={user.name}
                src={user.img}
              />           
            </ListItemAvatar> 
            </Link>   
            <Link href={`/user/${user.id}`}>  
            <ListItemText primary={user.name}/>
            </Link>
          </ListItem>
          <ListItem>
            <Grid container alignItems='center'>
              <Grid item xs={3} sm={3} lg={3}>
                <ListItemIcon>
                  <FavoriteBorderIcon />
                </ListItemIcon>
              </Grid>
              <Grid item xs={3} sm={3} lg={3}>
                <ListItemIcon>
                  <BookmarkBorderIcon />
                </ListItemIcon>
              </Grid>
              <Grid item xs={3} sm={3} lg={3}>
                <ListItemIcon>
                  <TelegramIcon />
                </ListItemIcon>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Like postId={postId} />
          </ListItem>
        
          <Box
            component="form"
            onSubmit={onSubmit} 
            method="POST"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderBottom: 1}}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="コメント"
              inputProps={{ 'aria-label': 'コメント' }}
              value={sentence}
              onChange={ e => setSentence(e.target.value)}
            />
            <Divider sx={{ height: 30, m: 0 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <Directions />
            </IconButton>
          </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
          {comments.map((comment) => (
           
            <ListItem alignItems="flex-start" key={comment.id}>
              <ListItemAvatar sx={{margin: 0}}>
                <Avatar sx={{ width: 40, height: 40, margin: 0}} src={ users.find((user) => user.userProfile === comment.comment)?.img} />
              </ListItemAvatar>
              <ListItemText sx={{ fontSize: 20, margin: 0}}
                primary={comment.sentence}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', fontSize: 7, margin: 0 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {users.find((user) => user.userProfile === comment.comment)?.name}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
                ))}
          </Table>
        </TableContainer>
          {/* {filterComment.map((comment) => (
            <div key={comment.id}>
              <Avatar
                src={
                  users.find(
                    (user) => user.userProfile === comment.comment
                  )?.img
                }
              />
                  {
                    users.find(
                      (user) => user.userProfile === comment.comment
                    )?.name
                  }
                {comment.sentence}
              
            </div>   
          ))} */}
      </List>
    ))}
    </>
  )
}

export default PostDialog
