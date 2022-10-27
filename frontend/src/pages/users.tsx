import Layout from '../components/Layout'
import { getAllUsers } from '../api/users';
import { GetStaticProps } from 'next'
import { USER } from '../types';
import Users from '../components/Users';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

interface STATICPROPS {
  users: USER[]
}

const UserPage: React.FC<STATICPROPS> = ({ users }) => {
    return (
      <Layout title="Blog">
        {/* <ImageList sx={{ width: 500, height: 650 }}> */}
          {/* <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">POST</ListSubheader>
          </ImageListItem> */}
        <ul>  {users && users.map((user) => <Users key={user.id} {...user} />)} </ul>
        {/* </ImageList> */}
      </Layout>
    )
  }
  export default UserPage
  
  export const getStaticProps: GetStaticProps = async () => {
    const users = await getAllUsers()
    return {
      props: { users },
    }
  }