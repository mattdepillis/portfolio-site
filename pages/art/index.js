import { useEffect, useState, Fragment } from 'react'

import Page from '../../components/Page'
import { resolveNotionPage } from '../../lib/resolve-notion-page'

export const getStaticProps = async () => {
  const artPageData = await resolveNotionPage(process.env.ART_PAGE_ID)

  return {
    props: { artPageData }
  }
}

const ArtPage = ({ artPageData }) => {
  const [artPage, setArtPage] = useState(undefined)

  useEffect(() => {
    setArtPage(artPageData)
  }, [artPageData])

  return (
    <Fragment>
      {artPage &&
        <Page
          headTitle={'Art'}
          rootPath={'/art'}
          page={artPage}
        />
      }
    </Fragment>
  )
}

export default ArtPage
