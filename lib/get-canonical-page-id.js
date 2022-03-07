import {
  parsePageId,
  getCanonicalPageId
} from 'notion-utils'

export const getCanonicalPageIdImpl = (
  pageId,
  recordMap,
  uuid
) => {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }

  return getCanonicalPageId(pageId, recordMap, {
    uuid
  })
}
