export const getAllLikes = async () => {
    const res = await fetch(
      new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/like-list/`)
    )
    const likes = await res.json()
  
    return likes
}