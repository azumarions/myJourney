import React, { createContext, useState, useEffect, Dispatch } from "react";
import { getAllPosts } from "../../api/post";
import { POST } from "../../types";

type PostContextType = {
  post: POST
  posts: POST[]
  setPost: Dispatch<React.SetStateAction<POST>>
  setPosts: Dispatch<React.SetStateAction<POST[]>>
}

interface PostContextProviderProps {
  children: React.ReactNode
}

export const PostContext = createContext<PostContextType>(
  {} as {
    post: POST
    posts: POST[]
    setPost: Dispatch<React.SetStateAction<POST>>
    setPosts: Dispatch<React.SetStateAction<POST[]>>
  }
);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [post, setPost] = useState<POST>({ id: 0, title: "", description: "", userPost: "", img: "", });
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
