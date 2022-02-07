import { formatBlockContent } from "./utils"

/**
 * @param {Object} notion
 * @param {string} id
*/
export const fetchWritingPageData = async (notion, id) => {
  const blocks = await notion.blocks.children.list({ block_id: id })
    .then(data => data.results)
  
  return Promise.all(blocks.map(async block => {
    const formatted = await formatBlockContent(notion, block)
    return formatted
  }))
}