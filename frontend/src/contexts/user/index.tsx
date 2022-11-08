import React, { createContext, useState, useEffect, Dispatch } from "react";
import { getAllUsers } from "../../api/users";
import { USER } from "../../types";

type UserContextType = {
  users: USER[]
  setUsers: Dispatch<React.SetStateAction<USER[]>>
}

interface UserContextProviderProps {
  children: React.ReactNode
}

export const UserContext = React.createContext<UserContextType>({} as {
  users: USER[]
  setUsers: Dispatch<React.SetStateAction<USER[]>>
});

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [users, setUsers] = useState<USER[]>([{ id: 0, userProfile: 0, name: "", statusMessage: "", description: "", img: "" }]);

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
       setUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
