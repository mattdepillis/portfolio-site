import { createContext, useState } from 'react'

export const AppContext = createContext()

// provides all nested children access to the sidebar context state
export const AppContextProvider = ({ children }) => {
  const [sidebarOptions, setSidebarOptions] = useState(undefined)
  return (
    <AppContext.Provider value={{ sidebarOptions, setSidebarOptions }}>
      {children}
    </AppContext.Provider>
  )
}
