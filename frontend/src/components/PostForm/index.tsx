import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextareaAutosize, TextField } from '@mui/material'
import { Input } from 'postcss'
import React, { useContext } from 'react'
import Cookie from "universal-cookie";
import { PostContext } from '../../contexts/post'

const cookie = new Cookie();

type DIALOG = {
    form: boolean
    handleFormClose: () => void
}

const PostForm: React.FC<DIALOG> = ({ form, handleFormClose}) => {
  const { post, setPost } = useContext(PostContext)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post/`, {
        method: "POST",
        body: JSON.stringify({ title: post.title, description: post.description }),
        headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
        },
    }).then((res) => {
        if (res.status === 401) {
        alert("JWT Token not valid");
        }
    });
    setPost({ id: 0, title: "", description: "", userPost: 0, img: "", });
  }
  return (
    <Dialog open={form} onClose={handleFormClose}>
        <DialogTitle>新規投稿</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <Box component="form" onSubmit={onSubmit} method="POST" noValidate sx={{ mt: 1 }}>
            <TextField
                autoFocus
                margin="normal"
                label="タイトル"
                type="text"
                fullWidth
                variant="standard"
                value={post.title}
                onChange={(e) => {
                    setPost({ ...post, title: e.target.value })
                }}
            />
            <TextField
            margin="normal"
            label="概要"
            type="text"
            fullWidth
            variant="standard"
            value={post.description}
            onChange={(e) => {
                setPost({ ...post, description: e.target.value})
            }}
            />
          <DialogActions>
            <Button onClick={handleFormClose}>戻る</Button>
            <Button type="submit">投稿</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
  )
}

export default PostForm
