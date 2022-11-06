import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PostContextProvider } from '../contexts/post'
import { UserContextProvider } from '../contexts/user'
import { ProfileContextProvider } from '../contexts/profile'
import { CommentContextProvider } from '../contexts/comment'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostContextProvider>
    <UserContextProvider>
    <ProfileContextProvider>
    <CommentContextProvider>
      <Component {...pageProps} />
    </CommentContextProvider>
    </ProfileContextProvider>
    </UserContextProvider>
    </PostContextProvider>
  )
}

export default MyApp
