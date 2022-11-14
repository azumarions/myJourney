import React, { createContext, useState, useEffect, Dispatch } from "react";
import { getMyProf } from "../../api/profile";
import { PROFILE } from "../../types";

// { id: 0, userProfile: "", name: "", statusMessage: "", description: "", img: "", }

type ProfileContextType = {
  myProfile: PROFILE[]
  setMyProfile: Dispatch<React.SetStateAction<PROFILE[]>>
}

interface ProfileContextProviderProps {
  children: React.ReactNode
}

export const ProfileContext = createContext<ProfileContextType>(
    {} as {
        myProfile: PROFILE[]
        setMyProfile: Dispatch<React.SetStateAction<PROFILE[]>>
    });

export const ProfileContextProvider = ({ children }: ProfileContextProviderProps) => {
  const [myProfile, setMyProfile] = useState<PROFILE[]>([]);

  useEffect(() => {
    const filter = async () => {
      try {
        const resProfile = await getMyProf()
        resProfile && setMyProfile(resProfile);
      } catch {
        console.log("error");
      };
    }
    filter()
  },[]);

  return (
    <ProfileContext.Provider
      value={{
       myProfile,
       setMyProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
