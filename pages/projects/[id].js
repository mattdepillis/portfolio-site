import { Fragment, useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'

import Page from '../../components/Page'
import { CenteredContainer } from '../../styles/containers'
import { resolveNotionPage } from '../../lib/resolve-notion-page'
import { getSiteMaps } from '../../lib/site-maps'

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

const ProjectPost = (props) => {
  const [projectPost, setProjectPost] = useState(undefined)

  useEffect(() => {
    setProjectPost(props)
  }, [props])

  return (
    <Fragment>
      {projectPost &&
        <Page
          parent={'Projects'}
          page={props}
          backArrow
        />
      }
    </Fragment>
  )
}

export default ProjectPost
