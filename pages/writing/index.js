import { useContext, useEffect, useState, Fragment } from 'react'

import Page from '../../components/Page'
import { SidebarContext } from '../../global-state/SidebarContext'
import { fetchSidebarOptions } from '../../notion-api/sidebar'
import { setupNotionAPIClients } from '../../notion-api/utils'

export const getStaticProps = async () => {
  const { officialNotionClient, notionClient } = setupNotionAPIClients()

  const sidebarOptions =
    await fetchSidebarOptions(officialNotionClient, process.env.PORTFOLIO_HUB_PAGE_ID)
  
  const writingPageData = await notionClient.getPage(process.env.WRITING_PAGE_ID)

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
  const { setSidebarOptions } = useContext(SidebarContext)
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
          headTitle={'Writing Page'}
          recordMap={writingPage}
        />
      }
    </Fragment>
  )
}

export default Writing
