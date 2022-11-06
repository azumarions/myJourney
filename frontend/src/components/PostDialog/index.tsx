import Link from 'next/link';
import { USER } from '../../types';
import { Avatar, ListItem, ListItemAvatar, ListItemText, List, Box, TextField, Button } from '@mui/material';
import { useContext } from 'react';
import { CommentContext } from '../../contexts/comment';
import Cookie from "universal-cookie";
import { COMMENT } from "../../types";
import { PostContext } from '../../contexts/post';
import Post from '../Post';

const cookie = new Cookie();

type PostDialogType = {
  id: number
  name: string
  img: string
  postId: number
}

const PostDialog: React.FC<PostDialogType> = ({ id, name, img, postId }) => {
  const { comment, setComment } = useContext(CommentContext)
  // const { post, setPost, postId, setPostId } = useContext(PostContext)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/comment/`, {
        method: "POST",
        body: JSON.stringify({ sentence: comment.sentence, comment: id, post: postId }),
        headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
        },
    }).then((res) => {
        if (res.status === 401) {
        alert("JWT Token not valid");
        }
    });
    setComment({ id: 0, sentence: "", });
  }
  return (
    <>      
      <List>
        <Link href={`/user/${id}`}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ m: 1, width: 50, height: 50, minWidth: 20 }}
                alt={name}
                src={img}
              />
            </ListItemAvatar>
            <ListItemText primary={name}/>
          </ListItem>
        </Link>
      </List>
      <div>
      <Box component="form" onSubmit={onSubmit} method="POST" noValidate sx={{ mt: 1 }}>
            <TextField
                autoFocus
                margin="normal"
                label="タイトル"
                type="text"
                fullWidth
                variant="standard"
                value={comment.sentence}
                onChange={(e) => {
                    setComment({ ...comment, sentence: e.target.value })
                }}
            />
            <Button type="submit">投稿</Button>
          </Box>
    </div>
    </>
  )
}

export default PostDialog
