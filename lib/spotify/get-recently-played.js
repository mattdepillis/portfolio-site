import { getAccessToken } from "./get-access-token"

export const getRecentlyPlayed = async () => {
  const { access_token: accessToken } = await getAccessToken()

  return await fetch(process.env.SPOTIFY_RECENTLY_LISTENED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
}