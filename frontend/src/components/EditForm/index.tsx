import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { POST } from '../../types'


type PostType = {
    post: POST
}

const EditForm: React.FC<PostType> = ({ post }) => {
    const [ edit, setEdit ] = useState(false)

    const onClick = (e) => {
        e.preventDefalult()
        setEdit(!edit)
    }
  return (
    <div>
      <Button onClick={onClick}>edit</Button>
    </div>
  )
}

export default EditForm
