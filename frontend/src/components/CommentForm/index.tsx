import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { CommentContext } from '../../contexts/comment';
import Cookie from "universal-cookie";

const cookie = new Cookie();

// type PostFormType = {
//   postId: number
// }


// const CommentForm:React.FC<PostFormType> = ({postId}) => {
//     const [ id, setId ] = useState<number>(0)
//     const [ sentence, setSentence ] = useState<string>("")
//     const { comments, setComments } = useContext(CommentContext)

//     const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setComments([...comments, {id: id, sentence: sentence}]);
//         await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/comment/`, {
//             method: "POST",
//             body: JSON.stringify({ sentence: sentence, post: postId }),
//             headers: {
//             "Content-Type": "application/json",
//             Authorization: `JWT ${cookie.get("access_token")}`,
//             },
//         }).then((res) => {
//             if (res.status === 401) {
//             alert("JWT Token not valid");
//             }
//         });
//         setComments([{ id: 0, sentence: "", }]);
//       }

//   return (
//     <Box component="form" onSubmit={onSubmit} method="POST" noValidate sx={{ mt: 1 }}>
//         <TextField
//             autoFocus
//             margin="normal"
//             label="タイトル"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={sentence}
//             onChange={ e => setSentence(e.target.value)}
//         />
//         <Button type="submit">投稿</Button>
//     </Box>
//   )
// }

// export default CommentForm
