import { parsePageId } from 'notion-utils'
import { mapNotionImageUrl } from './image-url'
import { fetchTweetAst } from 'static-tweets'
import pMap from 'p-map'

const getSiteForDomain = async () => {
  return {
    domain: 'mattdepillis.com',
    name: "Matt DePillis",
    rootNotionPageId: process.env.PORTFOLIO_HUB_PAGE_ID,
    // rootNotionSpaceId: config.rootNotionSpaceId,
    description: "Welcome to my portfolio site!"
  }
}

const getPage = async (client, pageId) => {
  const recordMap = await client.getPage(pageId)
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
    if (tweetAst) {
      return {
        ...acc,
        [tweetId]: tweetAst
      }
    } else {
      return acc
    }
  }, {})

  ;(recordMap).tweetAstMap = tweetAstMap

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
