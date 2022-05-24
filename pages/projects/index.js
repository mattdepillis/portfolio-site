import { useEffect, useState, Fragment } from 'react'

import Page from '../../components/Page'
import { resolveNotionPage } from '../../lib/resolve-notion-page'

export const getStaticProps = async () => {
  const projectsPageData = await resolveNotionPage(process.env.PROJECTS_PAGE_ID)

  return {
    props: {
      projectsPageData
    }
  }
}

const Projects = ({ projectsPageData }) => {
  const [projectsPage, setProjectsPage] = useState(undefined)

  useEffect(() => {
    setProjectsPage(projectsPageData)
  }, [projectsPageData])

  return (
    <Fragment>
      {projectsPage &&
        <Page
          rootPath={'/projects'}
          page={projectsPage}
        />
      }
    </Fragment>
  )
}

export default Projects
