import React, { createContext, useState, useEffect, Dispatch } from 'react'

type LoaderContextType = {
    loader: boolean
    setLoader: Dispatch<React.SetStateAction<boolean>>
}

interface LoaderProviderProps {
    children: React.ReactNode
}

export const LoaderContext = createContext<LoaderContextType>(
    {} as {
        loader: boolean
        setLoader: Dispatch<React.SetStateAction<boolean>>
    }
);

export const LoaderContextProvider = ({ children }: LoaderProviderProps) => {
    const [loader, setLoader] = useState<LoaderContextType>()

    return (
        <LoaderContext.Provider
        value={{
            loader,
            setLoader,
        }}>
            {children}
        </LoaderContext.Provider>
    )
}