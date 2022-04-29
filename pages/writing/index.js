import { useEffect, useState, Fragment } from 'react'

import Page from '../../components/Page'
import { resolveNotionPage } from '../../lib/resolve-notion-page'

export const getStaticProps = async () => {
  const writingPageData = await resolveNotionPage(process.env.WRITING_PAGE_ID)

  return {
    props: {
      writingPageData
    }
  }
}

const Writing = ({ writingPageData }) => {
  const [writingPage, setWritingPage] = useState(undefined)

  useEffect(() => {
    setWritingPage(writingPageData)
  }, [writingPageData])

  return (
    <Fragment>
      {writingPage &&
        <Page
          headTitle={'Writing'}
          rootPath={'/writing'}
          page={writingPage}
        />
      }
    </Fragment>
  )
}

export default Writing
