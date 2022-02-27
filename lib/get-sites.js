import { getSiteForDomain } from "./get-site-for-domain"

export const getSites = async () => {
  return [await getSiteForDomain()]
}