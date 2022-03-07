import { useContext, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Sidebar from '../components/Sidebar'
import { AppContext } from '../global-state/AppContext'
import { fetchSidebarOptions } from '../notion-api/sidebar'
import { setupNotionAPIClients } from '../notion-api/utils'

/*
  TODO: look at how to use localStorage options with next
    * would be nice to cache dark/light mode
*/

/*
  TODO: convert this component to TypeScript once I feel comfortable with types + fetching + rendering
*/
export const getStaticProps = async () => {
  const { officialNotionClient } = setupNotionAPIClients()
  const sidebarOptions = await fetchSidebarOptions(officialNotionClient, process.env.PORTFOLIO_HUB_PAGE_ID)

  return { props: { sidebarOptions } }
}

const Home = ({ sidebarOptions }) => {
  const { setSidebarOptions } = useContext(AppContext)

  useEffect(() => {
    setSidebarOptions(sidebarOptions)
  }, [sidebarOptions, setSidebarOptions])

  // ! should just render the homepage of my app via notion-client
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello world! this is my portfolio site!</h1>
      <Sidebar />
    </div>
  )
}

export default Home
