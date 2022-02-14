import Page from '../../components/Page'
import { setupNotionAPIClients } from '../../notion-api/utils'
import { getAllEntryIds } from '../../notion-api/databases'
import { Fragment, useEffect, useState } from 'react'

const { officialNotionClient, notionClient } = setupNotionAPIClients()

export const getStaticPaths = async () => {
  const paths = await getAllEntryIds(officialNotionClient, process.env.WRITING_DATABASE_ID)
  
  return { paths, fallback: false }
}

// TODO: create a slug for each post... figure out how to use this for page path
export const getStaticProps = async ({ params }) => {
  console.log(params)
  const post = await notionClient.getPage(params.id)
  return {
    props: { post }
  }
}

const WritingPost = ({ post }) => {
  const [writingPost, setWritingPost] = useState(undefined)
  console.log(post)

  useEffect(() => {
    setWritingPost(post)
  }, [post])

  return (
    <Fragment>
      <Page
        headTitle={'dynamic page'}
        recordMap={writingPost}
      />
    </Fragment>
  )
}

export default WritingPost
