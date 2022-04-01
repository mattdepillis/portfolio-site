import { fetchData } from '../fetchData'

export const getAccessToken = async () => {
  const basic = Buffer
    .from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)
    .toString("base64")

  const url = process.env.SPOTIFY_TOKEN_ENDPOINT + new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
  })

  console.log('url', url)

  // const response = await fetchData(
  //   process.env.SPOTIFY_TOKEN_ENDPOINT,
  //   'POST',
  //   `Basic ${basic}`,
  //   'application/x-www-form-urlencoded',
  //   JSON.stringify({
  //     grant_type : 'refresh_token',
  //     refresh_token : process.env.SPOTIFY_REFRESH_TOKEN
  //   })
  // )
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  console.log('r', response)
  return response.json()
}