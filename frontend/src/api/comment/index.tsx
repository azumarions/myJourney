export const getAllComments = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/comment-list/`)
  )
  const comments = await res.json()

  return comments
}