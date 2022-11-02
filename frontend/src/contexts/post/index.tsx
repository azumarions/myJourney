import React, { createContext, useState, useEffect } from "react";
import { getAllPosts } from "../../api/post";
import { POST } from "../../types";

type PostContextType = {
  posts: POST[]
}

interface PostContextProviderProps {
  children: React.ReactNode
}

export const PostContext = createContext<PostContextType>({ posts: [], });

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
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
       posts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
