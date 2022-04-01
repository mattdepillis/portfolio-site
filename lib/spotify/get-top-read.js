import { getAccessToken } from "./get-access-token"
import { fetchData } from "../fetchData"

export const getTopRead = async () => {
  const { accessToken } = await getAccessToken()

  console.log('a', accessToken)

  // TODO: fix invalid access token error!
  let topTracks = await fetchData(
    `${process.env.SPOTIFY_TOP_READ_ENDPOINT}/tracks`,
    'GET',
    `Bearer ${accessToken}`,
    'application/json'
  )
  topTracks = await topTracks.json()

  let topArtists = await fetchData(
    `${process.env.SPOTIFY_TOP_READ_ENDPOINT}/artists`,
    'GET',
    `Bearer ${accessToken}`,
    'application/json'
  )
  topArtists = await topArtists.json()

  return { topTracks: topTracks, topArtists: topArtists }
}