import { getAccessToken } from "./get-access-token"

export const getTopRead = async () => {
  const { access_token: accessToken } = await getAccessToken()

  const topTracks = await fetch(`${process.env.SPOTIFY_TOP_READ_ENDPOINT}tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())

  const topArtists = await fetch(`${process.env.SPOTIFY_TOP_READ_ENDPOINT}artists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())

  return { topTracks, topArtists }
}