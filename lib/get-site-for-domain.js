export const getSiteForDomain = async () => ({
  domain: 'mattdepillis.com',
  name: 'Matt DePillis',
  rootNotionPageId: process.env.PORTFOLIO_HUB_PAGE_ID,
  // rootNotionSpaceId: config.rootNotionSpaceId,
  description: 'Welcome to my portfolio site!'
})
