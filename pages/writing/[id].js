import { Fragment, useEffect, useState } from 'react'
import { resolveNotionPage } from '../../lib/resolve-notion-page'
import { getSiteMaps } from '../../lib/site-maps'

import Page from '../../components/Page'
import Custom404 from '../404'

export const getStaticProps = async ({ params }) => {
  const pageId = params.id
  console.log('p', params)

  // TODO: add the domain to load site, pageId props into the Notion Renderer
  try {
    const props = await resolveNotionPage(pageId)
    return { props, revalidate: 10 }
  } catch (err) {
    console.error("Error: ", err)
    throw err
  }
}

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
  console.log(props)

  useEffect(() => {
    setWritingPost(props)
  }, [props])

  // TODO: render a spinner instead while the post is loaded properly
  return (
    <Fragment>
      {!writingPost ?
        <Custom404 />
        :
        <Page
          headTitle={'dynamic page'}
          page={props}
        />
      }
    </Fragment>
  )
}

export default WritingPost
