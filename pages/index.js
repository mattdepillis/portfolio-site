import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'
import { Client } from '@notionhq/client'
import { SidebarContext } from '../global-state/SidebarContext'
import { fetchSidebarOptions } from '../notion-api/sidebar'
import { useContext, useEffect } from 'react'

/*
  TODO: look at how to use localStorage options with next
    * would be nice to cache dark/light mode
*/

/*
  TODO: convert this component to TypeScript once I feel comfortable with types + fetching + rendering
*/
export const getStaticProps = async () => {
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const sidebarOptions = await fetchSidebarOptions(notion, process.env.PORTFOLIO_HUB_PAGE_ID)

  return { props: { sidebarOptions } }
}

const Home = ({ sidebarOptions }) => {
  const { setSidebarOptions } = useContext(SidebarContext)

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
