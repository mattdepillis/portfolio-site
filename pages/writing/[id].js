import { Fragment, useEffect, useState } from 'react'
import { resolveNotionPage } from '../../lib/resolve-notion-page'
import { getSiteMaps } from '../../lib/site-maps'

import Page from '../../components/Page'
import Custom404 from '../404'

// const { notionClient } = setupNotionAPIClients()

export const getStaticProps = async ({ params }) => {
  const pageId = params.id

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

const WritingPost = (props) => {
  const [writingPost, setWritingPost] = useState(undefined)
  console.log('props', props)

  useEffect(() => {
    setWritingPost(props)
  }, [props])

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
