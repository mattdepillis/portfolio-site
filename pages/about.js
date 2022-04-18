import { useEffect, useState, Fragment } from 'react'

import Page from '../components/Page'
import { resolveNotionPage } from '../lib/resolve-notion-page'

export const getStaticProps = async () => {
  const aboutPageData = await resolveNotionPage(process.env.ABOUT_PAGE_ID)

  return {
    props: { aboutPageData }
  }
}

const AboutPage = ({ aboutPageData }) => {
  const [aboutPage, setAboutPage] = useState(undefined)

  useEffect(() => {
    setAboutPage(aboutPageData)
  }, [aboutPageData])

  return (
    <Fragment>
      {aboutPage &&
        <Page
          headTitle={'About'}
          rootPath={'/about'}
          page={aboutPage}
        />
      }
    </Fragment>
  )
}

export default AboutPage
