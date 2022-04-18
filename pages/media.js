import {
  useContext,
  useEffect,
  useState,
  Fragment
} from 'react'

import Page from '../components/Page'
import { resolveNotionPage } from '../lib/resolve-notion-page'

// spotify renderer for the custom-rendered spotify data (not using react-notion-x)
import SpotifySection from '../components/spotify/SpotifySection'

// spotify API for account data
import { getTopTracksAndArtists } from '../lib/spotify/get-top-tracks-and-artists'
import { getRecentlyPlayed } from '../lib/spotify/get-recently-played'

export const getStaticProps = async () => {
  const mediaPageData = await resolveNotionPage(process.env.MEDIA_PAGE_ID)

  const { topTracks, topArtists } = await getTopTracksAndArtists()
  const recentlyPlayed = await getRecentlyPlayed()

  return {
    props: {
      mediaPageData,
      topTracks,
      topArtists,
      recentlyPlayed
    }
  }
}

const MediaPage = ({
  mediaPageData,
  topTracks,
  topArtists,
  recentlyPlayed
}) => {
  const [mediaPage, setMediaPage] = useState(undefined)
  const [spotifySection, setSpotifySection] = useState(null)

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
