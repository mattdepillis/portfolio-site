import { Fragment, useEffect, useState } from 'react'

import { HomeContainer } from '../styles/containers'

import Page from '../components/Page'
import { resolveNotionPage } from '../lib/resolve-notion-page'

/*
  TODO: look at how to use localStorage options with next
    * would be nice to cache dark/light mode
*/


export const getStaticProps = async () => {
  const homePageData = await resolveNotionPage(process.env.PORTFOLIO_HUB_PAGE_ID)

  return { props: { homePageData } }
}

const Home = ({ homePageData }) => {
  const [homePage, setHomePage] = useState(undefined)

  useEffect(() => {
    setHomePage(homePageData)
  }, [homePageData])

  return (
    <Fragment>
        {homePage &&
          <HomeContainer>
            <Page
              page={homePage}
            />
          </HomeContainer>
        }
    </Fragment>
  )
}

export default Home
