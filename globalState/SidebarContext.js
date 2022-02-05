import { createContext, useState } from 'react'

export const SidebarContext = createContext()

export const SidebarContextProvider = ({ children }) => {
  const [sidebarOptions, setSidebarOptions] = useState(undefined)
  return (
    <SidebarContext.Provider value={{ sidebarOptions, setSidebarOptions }}>
      {children}
    </SidebarContext.Provider>
  )
}

/**
 * fetches the sidebar's options -- that is, the high-level pages of the portfolio site.
 * this is done programmatically so as to flexibly accommodate changes to the site's page data,
 * and to dynamically update the sidebar on any data changes.
 * @param {Object} notion the notion client
 * @param {string} id the id of the notion page (in this case, the top-level portfolio hub page)
*/
export const fetchSidebarOptions = async (notion, id) => {
  console.log('typeof notion client', typeof notion)
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

    // TODO: may want to return an object for formatting purposes
    return `${icon} ${pageTitle}`
  }))
  return sidebarOptions
}
