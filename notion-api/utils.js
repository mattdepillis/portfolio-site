/** standardizes the way the content of each block type is prepared for ui rendering
 * @param {Object} notion the notion client
 * @param {Object} block the block object
*/
export const formatBlockContent = async (notion, block) => {
  const { type } = block

  switch (type) {
    case 'paragraph':
      const { paragraph } = block
      return paragraph.text[0].text.content
    default:
      return block
  }
}
