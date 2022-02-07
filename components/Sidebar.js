import { useContext } from 'react'
import { SidebarContext } from '../global-state/SidebarContext'

/*
  TODO: pass pages down and render them like a notion-style toggle list
*/
const Sidebar = () => {
  const sidebarOptions = useContext(SidebarContext)
  return (
    <div>hello from the sidebar!</div>
  )
}

export default Sidebar
