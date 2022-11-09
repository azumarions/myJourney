// import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, ListItemAvatar, ListItemText, TextareaAutosize, TextField } from '@mui/material'
// import React, { useContext } from 'react'
// import { PostContext } from '../../contexts/post'
// import { ProfileContext } from '../../contexts/profile'
// import Post from '../Post'
// import Profile from '../Profile'

// type DIALOG = {
//     openMyProfile: boolean
//     handleProfileClose: () => void
// }

// const UserDialog: React.FC<DIALOG> = ({ openMyProfile, handleProfileClose}) => {
//   const { myProfile, setMyProfile} = useContext(ProfileContext)
//   const { posts, setPosts } = useContext(PostContext)
//   // const filterPost = posts.filter((post) => post.userPost === user.userProfile)

//   const filterPost = posts.filter((post) => (
//     myProfile.filter((prof) => prof.userProfile === post.userPost
//   )))
  
//   return (
//     <Dialog open={openMyProfile} onClose={handleProfileClose}>
//       {/* <DialogTitle>プロフィール</DialogTitle> */}
//       <Grid container>  
//         <Grid item xs={12} sm={6} md={6} lg={5}>
//           {myProfile.map((profile) => (
//             <Profile key={profile.id} user={profile} />
//           ))}
//         </Grid>
//         <Grid item xs={12} sm={6} md={6} lg={7}>
//           <Divider sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none" }, }} />
//           <Box sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, paddingTop: 1, textAlign: "center" }}>投稿一覧</Box>
//           <Box sx={{ width: '99%', margin: '20px auto' }}>
//             <Grid container spacing={0.2}>
//               {filterPost && filterPost.map((post) => (
//                 <Post key={post.id} {...post} />
//               ))}
//             </Grid>
//           </Box>
//         </Grid>
//       </Grid>
//     </Dialog>
//   )
// }

// export default UserDialog
