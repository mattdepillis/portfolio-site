import { parsePageId } from 'notion-utils'

import { setupNotionAPIClients } from '../notion-api/utils'
import { getSiteForDomain } from './get-site-for-domain'
import { getSiteMaps } from './site-maps'

const { notionClient } = setupNotionAPIClients()

const getPage = async (pageId) => {
  const recordMap = await notionClient.getPage(pageId)

  return recordMap
}

export const resolveNotionPage = async (rawPageId) => {
  let site
  let pageId
  let recordMap
  if (rawPageId && rawPageId !== 'index') {
    // returns the uuid (name removed) from the notion pageId
    pageId = parsePageId(rawPageId)

    if (pageId) {
      const resources = await Promise.all([
        getSiteForDomain(),
        getPage(pageId)
      ])

      site = resources[0]
      recordMap = resources[1]
    } else {
      const siteMaps = await getSiteMaps()
      const siteMap = siteMaps[0]
      pageId = siteMap?.canonicalPageMap[rawPageId]

      if (pageId) {
        const resources = await Promise.all([
          getSiteForDomain(),
          getPage(pageId)
        ])

        site = resources[0]
        recordMap = resources[1]
      } else {
        return {
          error: {
            message: `Not found "${rawPageId}"`,
            statusCode: 404
          }
        }
      }
    }
  } else {
    site = await getSiteForDomain()
    pageId = site.rootNotionPageId
    recordMap = await getPage(pageId)
  }

  const props = { site, pageId, recordMap }
  return { ...props }
}
