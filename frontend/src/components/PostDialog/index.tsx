import Link from 'next/link';
import { Avatar, ListItem, ListItemAvatar, ListItemText, List, Box, TextField, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { CommentContext } from '../../contexts/comment';
import Cookie from "universal-cookie";
import { UserContext } from '../../contexts/user';
import { COMMENT } from '../../types';
import { getAllComments } from '../../api/comment';

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
      setComments([...comments, {id: id, sentence: sentence}]);
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
      setComments([...comments, {id: 0, sentence: "" }]);
  }
  return (
    <>
    {user && user.map((user) => (
      <List key={id}>
        <Link href={`/user/${user.id}`}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ m: 1, width: 50, height: 50, minWidth: 20 }}
                alt={user.name}
                src={user.img}
              />
            </ListItemAvatar>
            <ListItemText primary={user.name}/>
          </ListItem>
        </Link>
          <Box component="form" onSubmit={onSubmit} method="POST" noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                label="タイトル"
                type="text"
                fullWidth
                variant="standard"
                value={sentence}
                onChange={ e => setSentence(e.target.value)}
            />
            <Button type="submit">投稿</Button>
          </Box>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Avatar src={ users.find((user) => user.userProfile === comment.comment)?.img} />
              {users.find((user) => user.userProfile === comment.comment)?.name}
              {comment.sentence}
            </div>
          ))}
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
