import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { USER } from '../../types'

const Users: React.FC<USER> = ({ id, name, img, description }) => {

  return (
    <List dense sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            <ListItem
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={name}
                    src={img}
                  />
                </ListItemAvatar>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
      </List>
  )
}
export default Users