import '../styles/globals.css'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'rc-dropdown/assets/index.css'
import 'katex/dist/katex.min.css'
import 'react-static-tweets/styles.css'
import { AppContextProvider } from '../global-state/AppContext'

const PortfolioSite = ({ Component, pageProps }) => (
  <AppContextProvider>
    <Component {...pageProps} />
  </AppContextProvider>
)

export default PortfolioSite
