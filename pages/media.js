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

// spotify API for account data
import { getTopTracksAndArtists } from '../lib/spotify/get-top-tracks-and-artists'
import { getRecentlyPlayed } from '../lib/spotify/get-recently-played'
import SpotifyData from '../components/SpotifyData'

export const getStaticProps = async () => {
  const { officialNotionClient, notionClient } = setupNotionAPIClients()

  const sidebarOptions = await fetchSidebarOptions(officialNotionClient, process.env.PORTFOLIO_HUB_PAGE_ID)

  // TODO: keep tabs with react-notion-x issues with linked collections
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
  const [spotifyDataLoaded, setSpotifyDataLoaded] = useState(false)

  useEffect(() => {
    setSidebarOptions(sidebarOptions)
  }, [sidebarOptions, setSidebarOptions])

  useEffect(() => {
    console.log('m', mediaPageData)
    setMediaPage(mediaPageData)
  }, [mediaPageData])

  useEffect(() => {
    if (topTracks && topArtists && recentlyPlayed) setSpotifyDataLoaded(true)
  }, [topTracks, topArtists, recentlyPlayed])

  return (
    <Fragment>
      {mediaPage &&
        <Page
          headTitle={'Media'}
          rootPath={'/media'}
          page={mediaPage}
        />
      }
      {spotifyDataLoaded &&
        <SpotifyData
          topTracks={topTracks}
          topArtists={topArtists}
          recentlyPlayed={recentlyPlayed}
        />
      }
    </Fragment>
  )
}

export default MediaPage