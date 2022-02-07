import { createContext, useState } from 'react'

export const SidebarContext = createContext()

// provides all nested children access to the sidebar context state
export const SidebarContextProvider = ({ children }) => {
  const [sidebarOptions, setSidebarOptions] = useState(undefined)
  return (
    <SidebarContext.Provider value={{ sidebarOptions, setSidebarOptions }}>
      {children}
    </SidebarContext.Provider>
  )
}
