export const fetchData = async (url, method, authorization, contentType, body) => {
  console.log('b', body)
  return fetch(url, {
    method,
    headers: {
      Authorization: authorization,
      ...(contentType && { 'Content-Type': contentType })
    },
    body: body || null
  })
}