import React, { createContext, useState, useEffect } from "react";
import { getAllUsers } from "../../api/users";
import { USER } from "../../types";

type UserContextType = {
  users: USER[]
}

interface UserContextProviderProps {
  children: React.ReactNode
}

export const UserContext = React.createContext<UserContextType>({ users: [], });

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [users, setUsers] = useState<USER[]>([]);

  useEffect(() => {
    const filter = async () => {
      try {
        const resUsers = await getAllUsers()
        resUsers && setUsers(resUsers);
      } catch {
        console.log("error");
      };
    }
    filter()
  },[]);

  return (
    <UserContext.Provider
      value={{
       users,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
