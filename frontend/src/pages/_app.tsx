import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PostContextProvider } from '../contexts/post'
import { UserContextProvider } from '../contexts/user'
import { ProfileContextProvider } from '../contexts/profile'
import { CommentContextProvider } from '../contexts/comment'
import { LikeContextProvider } from '../contexts/like'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostContextProvider>
    <UserContextProvider>
    <ProfileContextProvider>
    <CommentContextProvider>
    <LikeContextProvider>
      <Component {...pageProps} />
    </LikeContextProvider>
    </CommentContextProvider>
    </ProfileContextProvider>
    </UserContextProvider>
    </PostContextProvider>
  )
}

export default MyApp
