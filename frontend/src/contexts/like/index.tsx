import React, { createContext, useState, useEffect, Dispatch } from "react";
import { getAllPosts } from "../../api/post";
import { POST } from "../../types";

type LIKE = {
    likeUser: number
    likePost: number
}

type LikeContextType = {
    likes: LIKE[]
    setLikes: Dispatch<React.SetStateAction<LIKE[]>>
}

interface LikeContextProviderProps {
  children: React.ReactNode
}

export const LikeContext = createContext<LikeContextType>(
  {} as {
    likes: LIKE[]
    setLikes: Dispatch<React.SetStateAction<LIKE[]>>
  }
);

export const LikeContextProvider = ({ children }: LikeContextProviderProps) => {
  const [likes, setLikes] = useState<LIKE[]>([]);
  const [postLikes, setPostLikes] = useState();

  useEffect(() => {
    const filter = async () => {
      try {
        const resLikes = await getAllPosts()
        resLikes && setLikes(resLikes);
        setPostLikes(likes.map((like) => like.likePost === like.likeUser))
      } catch {
        console.log("error");
      };
    }
    filter()
  },[]);

  return (
    <LikeContext.Provider
      value={{
        likes,
        setLikes,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};
