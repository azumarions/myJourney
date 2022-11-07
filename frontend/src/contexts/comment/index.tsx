import React, { createContext, useState, useEffect, Dispatch, useContext } from "react";
import { getAllComments } from "../../api/comment";
import { COMMENT } from "../../types";

type CommentContextType = {
  comment: COMMENT
  comments: COMMENT[]
  setComment: Dispatch<React.SetStateAction<COMMENT>>
  setComments: Dispatch<React.SetStateAction<COMMENT[]>>
}

interface CommentContextProviderProps {
  children: React.ReactNode
}

export const CommentContext = createContext<CommentContextType>(
  {} as {
    comment: COMMENT
    comments: COMMENT[]
    setComment: Dispatch<React.SetStateAction<COMMENT>>
    setComments: Dispatch<React.SetStateAction<COMMENT[]>>
  }
);

export const CommentContextProvider = ({ children }: CommentContextProviderProps) => {
  const [comment, setComment] = useState<COMMENT>({ id: 0, sentence: "", })
  const [comments, setComments] = useState<COMMENT[]>([]);

  useEffect(() => {
    const filter = async () => {
      try {
        const resComments = await getAllComments()
        resComments && setComments(resComments);
      } catch {
        console.log("error");
      };
    }
    filter()
  },[]);

  return (
    <CommentContext.Provider
      value={{
        comment,
        setComment,
        comments,
        setComments
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
