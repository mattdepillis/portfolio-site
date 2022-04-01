import { Fragment, useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Sidebar from '../components/Sidebar'
import Page from '../components/Page'
import { AppContext } from '../global-state/AppContext'
import { fetchSidebarOptions } from '../notion-api/sidebar'
import { setupNotionAPIClients } from '../notion-api/utils'
import { resolveNotionPage } from '../lib/resolve-notion-page'

/*
  TODO: look at how to use localStorage options with next
    * would be nice to cache dark/light mode
*/

export const getStaticProps = async () => {
  const { officialNotionClient } = setupNotionAPIClients()

  const sidebarOptions = await fetchSidebarOptions(officialNotionClient, process.env.PORTFOLIO_HUB_PAGE_ID)
  const homePageData = await resolveNotionPage(process.env.PORTFOLIO_HUB_PAGE_ID)

  return { props: { sidebarOptions, homePageData } }
}

const Home = ({ sidebarOptions, homePageData }) => {
  const { setSidebarOptions } = useContext(AppContext)
  const [homePage, setHomePage] = useState(undefined)

  useEffect(() => {
    setSidebarOptions(sidebarOptions)
  }, [sidebarOptions, setSidebarOptions])

  useEffect(() => {
    console.log('page', homePageData)
    setHomePage(homePageData)
  }, [homePageData])

  return (
    <Fragment>
      {homePage &&
        <Page
          headTitle={'Home'}
          page={homePage}
        />
      }
    </Fragment>
  )
}

export default Home
