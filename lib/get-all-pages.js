import pMemoize from 'p-memoize'
import { getAllPagesInSpace } from 'notion-utils'
import { getCanonicalPageIdImpl } from './get-canonical-page-id'

import { setupNotionAPIClients } from '../notion-api/utils'

const { notionClient } = setupNotionAPIClients()

const uuid = process.env.NODE_ENV === 'development'

export const getAllPagesImpl = async (
  rootNotionPageId,
  rootNotionSpaceId
) => {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notionClient.getPage.bind(notionClient)
  )

  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map, pageId) => {
      const recordMap = pageMap[pageId]
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`)
      }

      const canonicalPageId = getCanonicalPageIdImpl(pageId, recordMap, {
        uuid
      })

      if (map[canonicalPageId]) {
        console.error(
          'error duplicate canonical page id',
          canonicalPageId,
          pageId,
          map[canonicalPageId]
        )

        return map
      } else {
        return {
          ...map,
          [canonicalPageId]: pageId
        }
      }
    },
    {}
  )

  return {
    pageMap,
    canonicalPageMap
  }
}

export const getAllPages = pMemoize(getAllPagesImpl, { maxAge: 60000 * 5 })
