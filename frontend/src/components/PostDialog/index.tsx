import Link from 'next/link';
import { USER } from '../../types';
import { Avatar, ListItem, ListItemAvatar, ListItemText, List } from '@mui/material';

const PostDialog: React.FC<USER> = ({ id, name, img }) => {
  return (
    <>      
      <List>
        <Link href={`/user/${id}`}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ m: 1, width: 50, height: 50, minWidth: 20 }}
                alt={name}
                src={img}
              />
            </ListItemAvatar>
            <ListItemText primary={name}/>
          </ListItem>
        </Link>
      </List>            
    </>     
  )
}

export default PostDialog
