import { Fragment, useEffect, useState } from 'react'
import { setupNotionAPIClients } from '../../notion-api/utils'
import { resolveNotionPage } from '../../lib/resolve-notion-page'

import Page from '../../components/Page'
import Custom404 from '../404'

const { notionClient } = setupNotionAPIClients()

export const getStaticProps = async ({ params }) => {
  const pageId = params.pageId

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
  return { paths: [], fallback: true }
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
