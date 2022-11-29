import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextareaAutosize, TextField } from '@mui/material'
import axios from 'axios';
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
  const { selectPost, setSelectPost } = useContext(PostContext)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(selectPost)
    const formData = new FormData()
    selectPost.title && formData.append('title', selectPost.title)
    selectPost.description && formData.append('description', selectPost.description)
    selectPost.img && formData.append('img', selectPost.img)
    console.log(formData.get('img'))

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post/`,
        formData,
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      // setSelectPost({ id: res.data.id, userPost: res.data.userPost, title: res.data.title, description: res.data.description, img: res.data.img, }),
      setSelectPost({ id: 0, userPost: 0, title: "", description: "", img: null, });
    } catch {
      console.log("error");
    }
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
                value={selectPost.title}
                onChange={(e) => {
                    setSelectPost({ ...selectPost, title: e.target.value })
                }}
            />
            <TextField
            margin="normal"
            label="概要"
            type="text"
            fullWidth
            variant="standard"
            value={selectPost.description}
            onChange={(e) => {
                setSelectPost({ ...selectPost, description: e.target.value})
            }}
            />
            <input
              type="file"
              onChange={(e) => {setSelectPost({ ...selectPost, img: e.target.files !== null ? e.target.files[0] : null})}}
            />
            <button
            disabled={!selectPost.title || !selectPost.description}
            type="submit"
            className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
            >
            create
            </button>
        </Box>
        </DialogContent>
      </Dialog>
  )
}

export default PostForm
