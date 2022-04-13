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

// spotify renderer for the custom-rendered spotify data (not using react-notion-x)
import SpotifySection from '../components/spotify/SpotifySection'

// spotify API for account data
import { getTopTracksAndArtists } from '../lib/spotify/get-top-tracks-and-artists'
import { getRecentlyPlayed } from '../lib/spotify/get-recently-played'

export const getStaticProps = async () => {
  const { officialNotionClient, notionClient } = setupNotionAPIClients()

  const sidebarOptions = await fetchSidebarOptions(officialNotionClient, process.env.PORTFOLIO_HUB_PAGE_ID)

  const mediaPageData = await resolveNotionPage(process.env.MEDIA_PAGE_ID)

  const { topTracks, topArtists } = await getTopTracksAndArtists()
  const recentlyPlayed = await getRecentlyPlayed()

  return {
    props: {
      sidebarOptions,
      mediaPageData,
      topTracks,
      topArtists,
      recentlyPlayed
    }
  }
}

const MediaPage = ({
  sidebarOptions,
  mediaPageData,
  topTracks,
  topArtists,
  recentlyPlayed
}) => {
  const { setSidebarOptions } = useContext(AppContext)
  const [mediaPage, setMediaPage] = useState(undefined)
  const [spotifySection, setSpotifySection] = useState(null)

  useEffect(() => {
    setSidebarOptions(sidebarOptions)
  }, [sidebarOptions, setSidebarOptions])

  useEffect(() => {
    setMediaPage(mediaPageData)
  }, [mediaPageData])

  useEffect(() => {
    setSpotifySection(
      <SpotifySection
        topTracks={topTracks}
        topArtists={topArtists}
        recentlyPlayed={recentlyPlayed}
      />
    )
  }, [topTracks, topArtists, recentlyPlayed])

  return (
    <Fragment>
      {mediaPage &&
        <Page
          headTitle={'Media'}
          rootPath={'/media'}
          page={mediaPage}
          additionalContent={spotifySection}
        />
      }
    </Fragment>
  )
}

export default MediaPage