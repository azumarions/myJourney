import Head from 'next/head'
import { FC } from 'react'
import Menu from './Menu'

type LayoutProps = {
  children: React.ReactNode
  title: string
}

const Layout: FC<LayoutProps> = ({ children, title = 'Default title' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Menu />
      <main>
        {children}
      </main>
      {/* <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
        @Udemy 2021
      </footer> */}
    </div>
  )
}

export default Layout
