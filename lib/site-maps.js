import pMap from 'p-map'

import { getAllPages } from './get-all-pages'
import { getSites } from './get-sites'

export const getSiteMaps = async () => {
  const sites = await getSites()

  const siteMaps = await pMap(
    sites,
    async (site, index) => {
      try {
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
