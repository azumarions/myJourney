import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PostContextProvider } from '../contexts/post'
import { UserContextProvider } from '../contexts/user'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostContextProvider>
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
    </PostContextProvider>
  )
}

export default MyApp
