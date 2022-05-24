import {
  parsePageId,
  getCanonicalPageId
} from 'notion-utils'

/*
  * consequential for including/excluding notion pageId in siteURLs
  * keeping uuid unused for now. if pageUrls work as expected in prod, will permanently remove
*/
export const getCanonicalPageIdImpl = (
  pageId,
  recordMap,
  uuid
) => {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }

  // ! NOTE: setting uuid: false removes notion pageId from dev URLs
  return getCanonicalPageId(pageId, recordMap, {
    uuid: false
  })
}
