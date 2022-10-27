export const getAllPosts = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post-list/`)
  )
  const posts = await res.json()
  return posts
}

export const getAllPostsId = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post-list/`)
  )
  const posts = await res.json()
  return posts.map((post: { id: any }) => {
    return {
      params: {
        id: String(post.id)
      }
    }
  })
}

export const getPost = async (id:string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post-detail/${id}`)
  )
  const post = await res.json()
  return post
}