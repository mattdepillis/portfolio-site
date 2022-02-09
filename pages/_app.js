import '../styles/globals.css'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'rc-dropdown/assets/index.css'
import 'katex/dist/katex.min.css'
import { SidebarContextProvider } from '../global-state/SidebarContext'

const PortfolioSite = ({ Component, pageProps }) => (
  <SidebarContextProvider>
    <Component {...pageProps} />
  </SidebarContextProvider>
)

export default PortfolioSite
