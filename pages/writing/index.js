import {
  useContext,
  useEffect,
  useState,
  Fragment
} from 'react'

import Page from '../../components/Page'
import { AppContext } from '../../global-state/AppContext'
import { fetchSidebarOptions } from '../../notion-api/sidebar'
import { setupNotionAPIClients } from '../../notion-api/utils'
import { resolveNotionPage } from '../../lib/resolve-notion-page'

export const getStaticProps = async () => {
  const { officialNotionClient, notionClient } = setupNotionAPIClients()

  const sidebarOptions = await fetchSidebarOptions(officialNotionClient, process.env.PORTFOLIO_HUB_PAGE_ID)

  const writingPageData = await resolveNotionPage(process.env.WRITING_PAGE_ID)

  return {
    props: {
      sidebarOptions,
      writingPageData
    }
  }
}

const Writing = ({
  sidebarOptions,
  writingPageData
}) => {
  const { setSidebarOptions } = useContext(AppContext)
  const [writingPage, setWritingPage] = useState(undefined)

  useEffect(() => {
    setSidebarOptions(sidebarOptions)
  }, [sidebarOptions, setSidebarOptions])

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
