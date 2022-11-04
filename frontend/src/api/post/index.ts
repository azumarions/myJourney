import { useContext } from "react";
import Cookie from "universal-cookie";
import { PostContext } from "../../contexts/post";
import { POST } from "../../types";

const cookie = new Cookie();

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
  return posts.map((post: { id: number }) => {
    return {
      params: {
        id: String(post.id)
      }
    }
  })
}

export const getPost = async (id: string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post-detail/${id}`)
  )
  const post = await res.json()
  return post
}


// export const postCreate = async (post) => {
//   // const { post, setPost } = useContext(PostContext)
//   await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/post/`, {
//     method: "POST",
//     body: JSON.stringify({ title: post.title, description: post.description, img: post.img }),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `JWT ${cookie.get("access_token")}`,
//     },
//   }).then((res) => {
//     if (res.status === 401) {
//       alert("JWT Token not valid");
//     }
//   });
//   // setPost({ id: 0, title: "", description: "", userPost: "", img: "", });
// };

export const postUpdate = async () => {
  const { post, setPost } = useContext(PostContext)
  await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${post.id}/`,
    {
      method: "PUT",
      body: JSON.stringify({ title: post.title, description: post.description, img: post.img }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }
  ).then((res) => {
    if (res.status === 401) {
      alert("JWT Token not valid");
    }
  });
  setPost({ id: 0, title: "", description: "", userPost: "", img: "", });
};
