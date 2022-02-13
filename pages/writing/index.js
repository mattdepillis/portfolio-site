import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Sidebar from '../../components/Sidebar'
import Page from '../../components/Page'
import { Client } from '@notionhq/client'
import { SidebarContext } from '../../global-state/SidebarContext'
import { fetchSidebarOptions } from '../../notion-api/sidebar'
import { useContext, useEffect, useState, Fragment } from 'react'

import { NotionAPI } from 'notion-client'

export const getStaticProps = async () => {
  // TODO: write a function to consolidate notionApi creation
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const notionApi = new NotionAPI({
    authToken: process.env.APP_TOKEN,
    activeUser: process.env.NOTION_USER_ID
  })

  const sidebarOptions = await fetchSidebarOptions(notion, process.env.PORTFOLIO_HUB_PAGE_ID)

  const writingPageData = await notionApi.getPage(process.env.WRITING_PAGE_ID)

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
