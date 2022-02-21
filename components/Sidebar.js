import { useContext } from 'react'
import { AppContext } from '../global-state/AppContext'

/*
  TODO: pass pages down and render them like a notion-style toggle list
*/
const Sidebar = () => {
  const sidebarOptions = useContext(AppContext)
  return (
    <div>hello from the sidebar!</div>
  )
}

export default Sidebar
