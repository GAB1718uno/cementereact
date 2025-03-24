"use client"

import { createContext, ReactNode, useContext, useState} from "react"

interface SidebarContextProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined >(undefined);

export const useSidebar = ():SidebarContextProps => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar debe usarse dentro de un SidebarProvider");
      }
    return context
}

interface SidebarProviderProps {
    children: ReactNode
}

export const SidebarProvider:React.FC<SidebarProviderProps> =({children})=> {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = ()=> setIsOpen((prev) => !prev)
    
    return (
        <SidebarContext.Provider value={{isOpen, toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}