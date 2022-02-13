import { Client } from '@notionhq/client'
import { NotionAPI } from 'notion-client'

/**
 * returns 2 different notion clients:
 * officialNotionClient: the beta notion api client, maintained by notion.so
 * notion-client: unofficial notion client compatible with react-notion-x renderer library.
 * @returns {{ Object, Object }}
*/
export const setupNotionAPIClients = () => {
  const officialNotionClient = new Client({ auth: process.env.NOTION_KEY })
  const notionClient = new NotionAPI({
    authToken: process.env.APP_TOKEN,
    activeUser: process.env.NOTION_USER_ID
  })

  return { officialNotionClient, notionClient }
}