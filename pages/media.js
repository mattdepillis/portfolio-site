import {
  useContext,
  useEffect,
  useState,
  Fragment
} from 'react'

import Page from '../components/Page'
import { AppContext } from '../global-state/AppContext'
import { fetchSidebarOptions } from '../notion-api/sidebar'
import { setupNotionAPIClients } from '../notion-api/utils'
import { resolveNotionPage } from '../lib/resolve-notion-page'

export const getStaticProps = async () => {
  const { officialNotionClient, notionClient } = setupNotionAPIClients()

  const sidebarOptions = await fetchSidebarOptions(officialNotionClient, process.env.PORTFOLIO_HUB_PAGE_ID)

  const mediaPageData = await resolveNotionPage(process.env.MEDIA_PAGE_ID)

  return {
    props: {
      sidebarOptions,
      mediaPageData
    }
  }
}

const MediaPage = ({
  sidebarOptions,
  mediaPageData
}) => {
  const { setSidebarOptions } = useContext(AppContext)
  const [mediaPage, setMediaPage] = useState(undefined)

  useEffect(() => {
    setSidebarOptions(sidebarOptions)
  }, [sidebarOptions, setSidebarOptions])

  useEffect(() => {
    console.log('m', mediaPageData)
    setMediaPage(mediaPageData)
  }, [mediaPageData])

  return (
    <Fragment>
      {mediaPage &&
        <Page
          headTitle={'Media'}
          rootPath={'/media'}
          page={mediaPage}
        />
      }
    </Fragment>
  )
}

export default MediaPage