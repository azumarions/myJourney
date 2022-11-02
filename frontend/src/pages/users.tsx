import Layout from '../components/Layout'
import { getAllUsers } from '../api/users';
import { GetStaticProps } from 'next'
import { USER } from '../types';
import Users from '../components/Users';

interface STATICPROPS {
  users: USER[]
}

const UserPage: React.FC<STATICPROPS> = ({ users }) => {
    return (
      <Layout title="Users">
        <ul>  {users && users.map((user) => <Users key={user.id} {...user} />)} </ul>
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