import { uuidToId, parsePageId } from 'notion-utils'
import { getCanonicalPageIdImpl } from './get-all-pages'

const createUrl = (path, searchParams) =>
  [path, searchParams.toString()].filter(Boolean).join('?')

export const mapPageUrl = (site, recordMap, searchParams) => (pageId = '') => {
  if (uuidToId(pageId) === site.rootNotionPageId) {
    return createUrl('/', searchParams)
  } else {
    return createUrl(`/${getCanonicalPageIdImpl(pageId, recordMap, { uuid })}`, searchParams)
  }
}

export const getCanonicalPageUrl = (site, recordMap) => (pageId = '') => {
  const pageUuid = parsePageId(pageId, { uuid: true })

  if (uuidToId(pageId) === site.rootNotionPageId) {
    return `https://${site.domain}`
  } else {
    return `https://${site.domain}/${getCanonicalPageIdImpl(pageUuid, recordMap, {
      uuid
    })}`
  }
}