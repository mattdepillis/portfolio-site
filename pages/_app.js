import '../styles/globals.css'
// import type { AppProps } from 'next/app'
import { ReferenceSidebarContextProvider } from '../globalState/SidebarContext'

const PortfolioSite = ({ Component, pageProps }) => (
  <ReferenceSidebarContextProvider>
    <Component {...pageProps} />
  </ReferenceSidebarContextProvider>
)

export default PortfolioSite
