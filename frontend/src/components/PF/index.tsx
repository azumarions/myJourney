import { Box, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { POST } from '../../types'
import Cookie from "universal-cookie";
import { PostContext } from '../../contexts/post';
import { KeyedMutator } from 'swr';
import { ProfileContext } from '../../contexts/profile';
import axios from 'axios';

const cookie = new Cookie();

type PostType = {
    postCreated: KeyedMutator<any>
}

const postForm: React.FC<PostType> = ({ postCreated }) => {
  const { selectPost, setSelectPost } = useContext(PostContext)
  const { editProfile } = useContext(ProfileContext)
  const [image, setImage] = useState<File | null>(null);

//   const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const img = e.target.files
//     if (img && img[0]) {
//       setSelectPost({...selectPost, img: img[0]})
//     }
// }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectPost)
    const formData = new FormData()
    selectPost.title && formData.append('title', selectPost.title)
    selectPost.description && formData.append('description', selectPost.description)
    selectPost.img && formData.append('img', selectPost.img)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      setSelectPost({ id: res.data.id, userPost: res.data.userPost, title: res.data.title, description: res.data.description, img: res.data.img, });
      postCreated();
    } catch {
      console.log("error");
    }

    // await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post/`, {
    //     method: "POST",
    //     body: JSON.stringify({ title: selectPost.title, img: selectPost.img, description: selectPost.description }),
    //     // body: formData,
    //     headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `JWT ${cookie.get("access_token")}`,
    //     },
    // }).then((res) => {
    //     if (res.status === 401) {
    //     alert("JWT Token not valid");
    //     }
    // });
    // setSelectPost({ id: 0, userPost: 0, title: "", description: "", img: null, });
    // postCreated();
  }

  return (
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
             {/* <input
              type="file"
              onChange={(e) => {setSelectPost({ ...selectPost, img: e.target.files![0]})}}
            /> */}
            <button
            disabled={!selectPost.title || !selectPost.description}
            type="submit"
            className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
            >
            create
            </button>
        </Box>
  )
}

export default postForm