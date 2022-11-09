import { Avatar, Grid, List, ListItem } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { USER } from '../../types'

type UserType = {
    user: USER
}

const Profile: React.FC<UserType> = ({ user }) => {
  return (
    <List key={user.id}>  
        <ListItem>
            <Grid container alignItems='center' justifyContent='center' direction="column">
            <Avatar
                sx={{ m: 1, width: 200, height: 200, minWidth: 20 }} 
                srcSet={`${user.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={user.name} 
                src={user.img} >
            </Avatar>  
            <Box sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, padding: 2 }}>{user.name}</Box>
            <Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{user.description}</Box>
            <Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{user.description}</Box>
            <Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{user.description}</Box>
            <Box sx={{ fontSize: { xs: 12, sm: 16, md: 16, lg: 18 }, }}>{user.description}</Box>
        </Grid>               
        </ListItem>
    </List>
  )
}

export default Profile
