// TODO: fill this out with getSiteMaps() + dependencies
import pMap from 'p-map'

import { getAllPages } from './get-all-pages'
import { getSites } from './get-sites'

export const getSiteMaps = async () => {
  const sites = await getSites()

  const siteMaps = await pMap(
    sites,
    async (site, index) => {
      try {
        console.log(
          'getSiteMap',
          `${index + 1}/${sites.length}`,
          `(${(((index + 1) / sites.length) * 100) | 0}%)`,
          site
        )

        return {
          site,
          ...(await getAllPages(site.rootNotionPageId, site.rootNotionSpaceId))
        }
      } catch (err) {
        console.warn('site build error', index, site, err)
      }
    },
    {
      concurrency: 4
    }
  )

  return siteMaps.filter(Boolean)
}
