import { Fragment, useEffect, useState } from 'react'
import { resolveNotionPage } from '../../lib/resolve-notion-page'
import { getSiteMaps } from '../../lib/site-maps'

import Page from '../../components/Page'
import Custom404 from '../404'

export const getStaticProps = async ({ params }) => {
  const pageId = params.id

  try {
    const props = await resolveNotionPage(pageId)
    console.log(props.recordMap.tweetAstMap)
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

  return ret
}

const WritingPost = (props) => {
  const [writingPost, setWritingPost] = useState(undefined)

  useEffect(() => {
    setWritingPost(props)
  }, [props])

  // TODO: render a spinner instead while the post is loaded properly
  // TODO: properly render the tweet, now that the correct info is loaded
  // * getPageTweet is the function needed for replication (NotionPage.tsx)
  return (
    <Fragment>
      {!writingPost ?
        <Custom404 />
        :
        <Page
          headTitle={'dynamic page'}
          recordMap={props.recordMap}
        />
      }
    </Fragment>
  )
}

export default WritingPost
