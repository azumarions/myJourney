import React, { createContext, useState, useEffect, Dispatch } from "react";
import { getAllPosts } from "../../api/post";
import { POST } from "../../types";

type PostContextType = {
  postId: number
  post: POST
  posts: POST[]
  setPostId: Dispatch<React.SetStateAction<number>>
  setPost: Dispatch<React.SetStateAction<POST>>
  setPosts: Dispatch<React.SetStateAction<POST[]>>
}

interface PostContextProviderProps {
  children: React.ReactNode
}

export const PostContext = createContext<PostContextType>(
  {} as {
    postId: number
    post: POST
    posts: POST[]
    setPostId: Dispatch<React.SetStateAction<number>>
    setPost: Dispatch<React.SetStateAction<POST>>
    setPosts: Dispatch<React.SetStateAction<POST[]>>
  }
);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [postId, setPostId] = useState<number>(0)
  const [post, setPost] = useState<POST>({ id: 0, title: "", description: "", userPost: 0, img: "", });
  const [posts, setPosts] = useState<POST[]>([]);

  useEffect(() => {
    const filter = async () => {
      try {
        const resPosts = await getAllPosts()
        resPosts && setPosts(resPosts);
      } catch {
        console.log("error");
      };
    }
    filter()
  },[]);

  return (
    <PostContext.Provider
      value={{
        postId,
        setPostId,
        post,
        setPost,
        posts,
        setPosts
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
