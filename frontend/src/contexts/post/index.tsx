import React, { createContext, useState, useEffect, Dispatch } from "react";
import { getAllPosts, getPost } from "../../api/post";
import { NEW_POST, POST } from "../../types";

type PostContextType = {
  selectPost: NEW_POST
  posts: POST[]
  setSelectPost: Dispatch<React.SetStateAction<NEW_POST>>
  setPosts: Dispatch<React.SetStateAction<POST[]>>
}

interface PostContextProviderProps {
  children: React.ReactNode
}

export const PostContext = createContext<PostContextType>(
  {} as {
    selectPost: NEW_POST
    posts: POST[]
    setSelectPost: Dispatch<React.SetStateAction<NEW_POST>>
    setPosts: Dispatch<React.SetStateAction<POST[]>>
  }
);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [selectPost, setSelectPost] = useState<NEW_POST>({ id: 0, userPost: 0, title: "", description: "", postImg: null });
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
        selectPost,
        setSelectPost,
        posts,
        setPosts
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
