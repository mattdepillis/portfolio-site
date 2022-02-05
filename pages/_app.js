import '../styles/globals.css'
// import type { AppProps } from 'next/app'
import { SidebarContextProvider } from '../globalState/SidebarContext'

const PortfolioSite = ({ Component, pageProps }) => (
  <SidebarContextProvider>
    <Component {...pageProps} />
  </SidebarContextProvider>
)

export default PortfolioSite
