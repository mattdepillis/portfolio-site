import { parsePageId } from 'notion-utils'
import pMap from 'p-map'
import dynamic from 'next/dynamic'
import { fetchTweetAst } from 'static-tweets'

import { setupNotionAPIClients } from '../notion-api/utils'
import { getSiteForDomain } from './get-site-for-domain'

// const fetchTweetAst = dynamic(() => import('static-tweets')
//   .then(module => module.fetchTweetAst), { ssr: false })

const { notionClient } = setupNotionAPIClients()

const getPage = async (pageId) => {
  const recordMap = await notionClient.getPage(pageId)
  const blockIds = Object.keys(recordMap.block)

  const tweetIds = blockIds
    .map((blockId) => {
      const block = recordMap.block[blockId]?.value

      if (block) {
        if (block.type === 'tweet') {
          const src = block.properties?.source?.[0]?.[0]

          if (src) {
            const id = src.split('?')[0].split('/').pop()
            if (id) return id
          }
        }
      }

      return null
    })
    .filter(Boolean)

  // TODO: get the tweets to render properly!
  const tweetAsts = await pMap(
    tweetIds,
    async (tweetId) => {
      try {
        return {
          tweetId,
          tweetAst: await fetchTweetAst(tweetId)
        }
      } catch (err) {
        console.error('error fetching tweet info', tweetId, err)
      }
    },
    {
      concurrency: 4
    }
  )

  const tweetAstMap = tweetAsts.reduce((acc, { tweetId, tweetAst }) => {
    console.log('ast', tweetAst)
    if (tweetAst) {
      return {
        ...acc,
        [tweetId]: tweetAst
      }
    }
    return acc
  }, {})
  console.log('map', typeof tweetAstMap, tweetAstMap)

  recordMap.tweetAstMap = tweetAstMap

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
      // TODO: need to integrate all dependencies for getSiteMaps()
      const siteMaps = await getSiteMaps()
      const siteMap = siteMaps[0]
      pageId = siteMap?.canonicalPageMap[rawPageId]

      if (pageId) {
        const resources = await Promise.all([
          getSiteForDomain(domain),
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
