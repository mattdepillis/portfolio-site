import { useContext } from 'react'
import { SidebarContext } from '../globalState/SidebarContext'

const Sidebar = () => {
  const sidebarOptions = useContext(SidebarContext)
  return (
    <div>hello from the sidebar!</div>
  )
}

export default Sidebar
