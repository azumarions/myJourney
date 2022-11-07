import React, { createContext, useState, useEffect, Dispatch } from "react";
import { getAllLikes } from "../../api/like";
import { LIKE } from "../../types"

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

  useEffect(() => {
    const filter = async () => {
      try {
        const resLikes = await getAllLikes()
        resLikes && setLikes(resLikes);
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
