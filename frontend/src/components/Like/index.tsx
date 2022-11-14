import React, { useContext, useState } from 'react'
import Cookie from "universal-cookie";
import { LikeContext } from '../../contexts/like'
import { UserContext } from '../../contexts/user'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar, AvatarGroup, Box, IconButton, ListItem, ListItemIcon } from '@mui/material'

const cookie = new Cookie();

type LikeType = {
    postId: number
    userId: number
}

const Like: React.FC<LikeType> = ({ postId, userId }) => {
  const { likes, setLikes } = useContext(LikeContext)
  const { users, setUsers } = useContext(UserContext)
  const [ like, setLike ] = useState(false)
  const [ liked, setLiked ] = useState()

  const filterLikes = Object.values(likes).filter((like) => (
    like.postLike === postId
  ))

  const LIKED = async (e) => {
    e.preventDefault();
    const likedId = Object.values(likes).find((like) => like.postLike === postId && like.userLike === userId)
    console.log(likedId)
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/like/`, {
      method: "POST",
      body: JSON.stringify({ postLike: postId }),
      headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${cookie.get("access_token")}`,
      },
    });
  }

  const UNLIKED = async (e) => {
    e.preventDefault();
    const likedId = Object.values(likes).find((like) => like.postLike === postId && like.userLike === userId)
    console.log(likedId)
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/like/${likedId?.id}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${cookie.get("access_token")}`,
      },
    });
    setLikes([{ id: 0, userLike: 0, postLike: 0 }]);
  }

  return (
    <>
      <ListItem sx={{ ml: -3.5, width: "100%" }}>
        <ListItemIcon>
          <Box onClick={() => setLike(!like)}>
              {like ?
                <IconButton onClick={UNLIKED}>
                  <FavoriteIcon sx={{ color: "red", fontSize: { xs: 30, sm: 40, md: 45, lg: 50 }, }} />
                </IconButton>
              :
                <IconButton onClick={LIKED}>
                  <FavoriteIcon sx={{ color: "pink", fontSize: { xs: 30, sm: 40, md: 45, lg: 50 }, }} />
                </IconButton>
              }
          </Box>
        </ListItemIcon>
        <AvatarGroup>
          {likes.map((like) => (
            <Avatar 
              key={like.id} 
              sx={{ 
                width: { xs: 35, sm: 50, md: 55, lg: 60 },
                height: { xs: 35, sm: 50, md: 55, lg: 60 },
                margin: 0
              }}
              src={ users.find((user) => user.userProfile === like.userLike)?.img} 
            />
          ))}
          
          {/* {Object.values(likes).map((like) => (
            <Avatar 
              key={like.id}
              sx={{ 
                width: { xs: 35, sm: 50, md: 55, lg: 60 },
                height: { xs: 35, sm: 50, md: 55, lg: 60 },
                margin: 0
              }}
              src={ users.find((user) => user.userProfile === like.userLike)?.img}
            />
          ))} */}
          
        </AvatarGroup>
      </ListItem>
    </>
  )
}

export default Like
