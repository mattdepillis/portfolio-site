// * imported styles
import 'react-notion-x/src/styles.css'

import 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import '../styles/prism-theme.css'

import 'rc-dropdown/assets/index.css'
import 'katex/dist/katex.min.css'
import 'react-static-tweets/styles.css'

// * custom styles
import '../styles/globals.css'
import '../styles/custom-css/responsive-page-layout.css'
import '../styles/custom-css/notion-collections.css'
import '../styles/notion.css'

import { NextUIProvider } from '@nextui-org/react';
import { AppContextProvider } from '../global-state/AppContext'

const PortfolioSite = ({ Component, pageProps }) => (
  <NextUIProvider>
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  </NextUIProvider>
)

export default PortfolioSite
