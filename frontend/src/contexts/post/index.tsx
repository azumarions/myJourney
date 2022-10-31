import React, { createContext, useState, useEffect } from "react";
import { getAllPosts } from "../../api/post";
import { getAllUsers } from "../../api/users";
import { POST, USER } from "../../types";

type PostContextType = {
  posts: POST[]
  users: USER[]
  filterPost: POST[]
  filterUser: USER[]
}


interface PostContextProviderProps {
  children: React.ReactNode
}

export const PostContext = React.createContext<PostContextType>({posts: [], users: [], filterPost: [], filterUser: [], });

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [posts, setPosts] = useState<POST[]>([]);
  const [users, setUsers] = useState<USER[]>([]);
  const [filterPost, setFilterPost] = useState<POST[]>([]);
  const [filterUser, setFilterUser] = useState<USER[]>([]);
  // const [user, setUser] = React.useState({ id: 1, name: 'foo' });
  // const user = users.find((user) => user.id === 2)

  useEffect(() => {
    const filter = async () => {
      try {
        const resPosts = await getAllPosts()
        const resUsers = await getAllUsers()
        resPosts.data[0] && setPosts(resPosts.data[0]);
        resUsers && setUsers(resUsers);
        setFilterUser(users.filter((user) => {
          return user.userProfile === resPosts.data[0].userPost;
        }))
        setFilterPost(posts.filter((post) => {
          return post.userPost === resUsers.data[0].userProfile;
        }))
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
       users,
       filterPost,
       filterUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
