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

export const fetchSidebarOptions = async (notion, id) => {
  const options = await notion.blocks.children.list({ block_id: id })
    .then(data => data.results
      .filter(option => option.child_page)
      .map(option => ({
        pageId: option.id,
        pageTitle: option.child_page.title
      }))
    )

  const sidebarOptions = Promise.all(options.map(async page => {
    const { pageId, pageTitle } = page

    const icon = await notion.pages.retrieve({ page_id: pageId })
      .then(data => data.icon.emoji)

    return `${icon} ${pageTitle}`
  }))
  return sidebarOptions
}
