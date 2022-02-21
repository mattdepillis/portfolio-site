import Page from '../../components/Page'
import { setupNotionAPIClients } from '../../notion-api/utils'
import { getAllPageSlugs } from '../../notion-api/databases'
import { AppContext } from '../../global-state/AppContext'
import { Fragment, useContext, useEffect, useState } from 'react'

const { officialNotionClient, notionClient } = setupNotionAPIClients()

/*
  * getAllEntryIds should also get the slug for each post
  * the slug should be the id of the post and the page Id should be the "notionPageId" or something
*/
export const getStaticPaths = async () => {
  const paths =
    await getAllPageSlugs(officialNotionClient, process.env.WRITING_DATABASE_ID)
  
  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }) => {
  // TODO: maybe just try the notion client get databases method
  // * can search the db by filter param and then get the child page data
  const post = await notionClient.getPage(params.slug)
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
