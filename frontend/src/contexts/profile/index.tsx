import React, { createContext, useState, useEffect, Dispatch } from "react";
import { getMyProf } from "../../api/profile";
import { PROFILE } from "../../types";

// { id: 0, userProfile: "", name: "", statusMessage: "", description: "", img: "", }

type ProfileContextType = {
  profile: PROFILE[]
  setProfile: Dispatch<React.SetStateAction<PROFILE[]>>
}

interface ProfileContextProviderProps {
  children: React.ReactNode
}

export const ProfileContext = createContext<ProfileContextType>(
    {} as {
        profile: PROFILE[]
        setProfile: Dispatch<React.SetStateAction<PROFILE[]>>
    });

export const ProfileContextProvider = ({ children }: ProfileContextProviderProps) => {
  const [profile, setProfile] = useState<PROFILE[]>([{ id: 0, userProfile: 0, name: "", statusMessage: "", description: "", img: "", }]);

  useEffect(() => {
    const filter = async () => {
      try {
        const resProfile = await getMyProf()
        resProfile && setProfile(resProfile);
      } catch {
        console.log("error");
      };
    }
    filter()
  },[]);

  return (
    <ProfileContext.Provider
      value={{
       profile,
       setProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
