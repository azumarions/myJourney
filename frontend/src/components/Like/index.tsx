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
    userPost: number

}

const Like: React.FC<LikeType> = ({ postId, userId, userPost }) => {
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
    }).then((data) => {
      setLikes(data)
    })
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
      <ListItem>
        <ListItemIcon sx={{ marginRight: 1 }}>
          <Box onClick={() => setLike(!like)}>
              {like ?
                <IconButton onClick={LIKED}>
                  <FavoriteIcon sx={{ color: "red", fontSize: 40 }} />
                </IconButton>
              :
                <IconButton onClick={UNLIKED}>
                  <FavoriteIcon sx={{ color: "pink", fontSize: 40 }} />
                </IconButton>
              }
          </Box>
        </ListItemIcon>
        <AvatarGroup max={10}>
          {/* {filterLikes.map((like) => (
            <Avatar key={like.id} sx={{ width: 40, height: 40, margin: 0}} src={ users.find((user) => user.userProfile === like.userLike)?.img} />
          ))} */}
          {Object.values(likes).map((like) => (
            <Avatar key={like.id} sx={{ width: 40, height: 40, margin: 0 }} src={ users.find((user) => user.userProfile === like.userLike)?.img} />
          ))}
        </AvatarGroup>
      </ListItem>
    </>
  )
}

export default Like
