import { AppProps } from 'next/app'
import GlobalStyle from '../styles/global'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { ModalProvider } from 'styled-react-modal'

import { ModalBackground } from '@/styles/pages/_app'
import { SearchProvider } from '@/contexts/SearchContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <ModalProvider backgroundComponent={ModalBackground}>
        <SearchProvider>
          <Component {...pageProps} />

          <GlobalStyle />
        </SearchProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default MyApp
