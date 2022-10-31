import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PostContextProvider } from '../contexts/post'
import { TestContextProvider } from '../contexts/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostContextProvider>
      <TestContextProvider>
        <Component {...pageProps} />
      </TestContextProvider>
    </PostContextProvider>
  )
}

export default MyApp
