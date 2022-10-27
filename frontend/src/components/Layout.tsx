import Head from 'next/head'
import { FC } from 'react'
import Menu from './Menu'

type LayoutProps = {
  children: React.ReactNode
  title: string
}

const Layout: FC<LayoutProps> = ({ children, title = 'Default title' }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-900 text-white font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <Menu />
      <main className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </main>
      {/* <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
        @Udemy 2021
      </footer> */}
    </div>
  )
}

export default Layout
