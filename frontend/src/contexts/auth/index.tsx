import React, { createContext, useState, useEffect } from "react";

type USER = {
  id: number
  userProfile: string
  name: string
}

type TestContextType = {
  users: USER[]
}

const initialUsers = [
  { id: 1, userProfile: '1c229c2e6b28461ba1b68b3d056d76c7', name: 'foo' },
  { id: 2, userProfile: '2', name: 'bar' },
  { id: 3, userProfile: '3', name: 'baz' },
]

interface TestContextProviderProps {
  children: React.ReactNode
}

export const TestContext = React.createContext<TestContextType>({ users: [], });

export const TestContextProvider = ({ children }: TestContextProviderProps) => {
  const [users, setUsers] = useState(initialUsers);
  // const [user, setUser] = React.useState({ id: 1, name: 'foo' });
  // const user = users.find((user) => user.id === 2)

  return (
    <TestContext.Provider
      value={{
       users,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
