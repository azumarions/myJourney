import { Avatar, AvatarGroup } from '@mui/material'
import React, { useContext } from 'react'
import { LikeContext } from '../../contexts/like'
import { PostContext } from '../../contexts/post'
import { UserContext } from '../../contexts/user'

type LikeType = {
    postId: number
}

const Like: React.FC<LikeType> = ({ postId }) => {
  const { likes, setLikes } = useContext(LikeContext)
  const { users, setUsers } = useContext(UserContext)

  const filterLikes = likes.filter((like) => (
    like.postLike === postId
  ))

  return (
    <>
      <AvatarGroup max={7}>
        {filterLikes.map((like) => (
          <Avatar key={like.id} sx={{ width: 40, height: 40, margin: 0}} src={ users.find((user) => user.userProfile === like.userLike)?.img} />
        ))}
      </AvatarGroup>
    </>
  )
}

export default Like
