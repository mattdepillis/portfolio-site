import { createContext, useState } from 'react'

export const SidebarContext = createContext()

export const ReferenceSidebarContextProvider = ({ children }) => {
  const [sidebarOptions, setSidebarOptions] = useState(undefined)
  return (
    <SidebarContext.Provider value={{ sidebarOptions, setSidebarOptions }}>
      {children}
    </SidebarContext.Provider>
  )
}

