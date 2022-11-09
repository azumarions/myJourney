import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PostContextProvider } from '../contexts/post'
import { UserContextProvider } from '../contexts/user'
import { ProfileContextProvider } from '../contexts/profile'
import { CommentContextProvider } from '../contexts/comment'
import { LikeContextProvider } from '../contexts/like'
import { ColorModeContextProvider } from '../contexts/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorModeContextProvider>
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
    </ColorModeContextProvider>
  )
}

export default MyApp
