/**
 * gets the ids of all entries in a database.
 * @param {object} client the client used to make the API call to Notion
 * @param {string} databaseId the id of the database to query
 * @returns {object[]}
*/ 
export const getAllPageSlugs = async (client, databaseId) => await client.databases
  .query({ database_id: databaseId })
  .then(data => data.results.map(result => ({
      params: {
        slug: result.properties.Slug['rich_text'][0].text.content
      }
    })))