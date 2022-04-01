/**
 * Returns an auth token to perform a RESTful request on the Spotify API.
 * @returns {Object} a valid auth token
*/
export const getAccessToken = async () => {
  // append refresh token to url... doesn't work in the body
  const url = process.env.SPOTIFY_TOKEN_ENDPOINT + new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
  })

  // get the base64 encoding of the client id + the client secret
  const basic = Buffer
    .from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)
    .toString("base64")

  // get a new auth token
  return await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
}