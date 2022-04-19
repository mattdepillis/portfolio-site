import { useEffect, useState, Fragment } from 'react'

import Page from '../components/Page'
import { resolveNotionPage } from '../lib/resolve-notion-page'

export const getStaticProps = async () => {
  const resumePageData = await resolveNotionPage(process.env.RESUME_PAGE_ID)

  return {
    props: { resumePageData }
  }
}

const ResumePage = ({ resumePageData }) => {
  const [resumePage, setResumePage] = useState(undefined)

  useEffect(() => {
    setResumePage(resumePageData)
  }, [resumePageData])

  return (
    <Fragment>
      {resumePage &&
        <Page
          headTitle={'Resume'}
          rootPath={'/resume'}
          page={resumePage}
        />
      }
    </Fragment>
  )
}

export default ResumePage
