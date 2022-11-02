import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

const top = () => {
  return (
    <Layout title='Top'>
    <div>
      <Link href={"/posts"}>
        <p>
            posts
        </p>
      </Link>
    </div>
    </Layout>
  )
}

export default top
