'use client';
import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";

interface ContextProps{
    xtema: string,
    setXtema: Dispatch<SetStateAction<string>>,
}

const GlobalContext = createContext<ContextProps>({
    xtema: '',
    setXtema: (): string => '',
})


export const GlobalContextProvider = ({children}) =>{
    
    const [xtema, setXtema] = useState('');


    return(
        <GlobalContext.Provider value={{xtema, setXtema}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
