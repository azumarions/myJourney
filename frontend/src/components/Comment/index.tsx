import React, { useContext, useState } from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Box, Typography, Divider, IconButton, InputBase, TableContainer, Table } from '@mui/material';
import Cookie from "universal-cookie";
import { UserContext } from '../../contexts/user'
import { CommentContext } from '../../contexts/comment';
import TelegramIcon from '@mui/icons-material/Telegram';

const cookie = new Cookie();

type CommentType = {
    postId: number
}

const Comment: React.FC<CommentType> = ({ postId }) => {
  const { users, setUsers } = useContext(UserContext)
  const { comments, setComments } = useContext(CommentContext)
  const [ id, setId ] = useState<number>(0)
  const [ sentence, setSentence ] = useState<string>("")

  const filterComment = Object.values(comments).filter((comment) => (
    comment.post === postId
  ))

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
  }

  return (
    <>
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
            <TelegramIcon sx={{fontSize: 30 }} />
        </IconButton>
      </Box>
          {filterComment.map((comment) => (
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
    </>
  )
}

export default Comment
