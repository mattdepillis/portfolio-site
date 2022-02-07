import '../styles/globals.css'
import { SidebarContextProvider } from '../global-state/SidebarContext'

const PortfolioSite = ({ Component, pageProps }) => (
  <SidebarContextProvider>
    <Component {...pageProps} />
  </SidebarContextProvider>
)

export default PortfolioSite
