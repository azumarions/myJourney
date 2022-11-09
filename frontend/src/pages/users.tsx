import Layout from '../components/Layout'
import { getAllUsers } from '../api/users';
import { GetStaticProps } from 'next'
import { USER } from '../types';
import User from '../components/User';
import React from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

interface STATICPROPS {
  users: USER[]
}

const UserPage: React.FC<STATICPROPS> = ({ users }) => {
    return (
      <Layout title="Users">
        <Box sx={{ width: '99%', margin: '20px auto' }}>
        <Grid container spacing={0.2}>
          {users.map((user) => <User key={user.id} user={user} />)}
        </Grid>
      </Box>
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