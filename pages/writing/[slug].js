import { Fragment, useEffect, useState } from 'react'
import { resolveNotionPage } from '../../lib/resolve-notion-page'
import { getSiteMaps } from '../../lib/site-maps'

import Page from '../../components/Page'
import Custom404 from '../404'

// const { notionClient } = setupNotionAPIClients()

export const getStaticProps = async (context) => {
  console.log('c', context)
  const pageId = context.params.pageId
  console.log('p', pageId)

  try {
    const props = await resolveNotionPage(pageId)
    return { props, revalidate: 10 }
  } catch (err) {
    console.error("Error: ", err)
    throw err
  }
}

/*
  * get the slug from getStaticPaths.
  * will need to have a caching strategy for grabbing the page id
*/
export const getStaticPaths = async () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      paths: [],
      fallback: true
    }
  }

  const siteMaps = await getSiteMaps()

  const ret = {
    paths: siteMaps.flatMap((siteMap) =>
      Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
        params: {
          pageId
        }
      }))
    ),
    fallback: true
  }
  console.log(ret.paths)
  return ret
}

const WritingPost = ({ post, found }) => {
  const [writingPost, setWritingPost] = useState(undefined)
  console.log(post)

  useEffect(() => {
    setWritingPost(post)
  }, [post])

  return found ? (
    <Fragment>
      <Page
        headTitle={'dynamic page'}
        recordMap={writingPost}
      />
    </Fragment>
  ) :
  (
    <Custom404 />
  )
}

export default WritingPost
