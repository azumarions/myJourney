import Head from 'next/head'
import React from 'react'
import { FC } from 'react'
import { ColorModeContextProvider } from '../contexts/layout'
import Menu from './Menu'

type LayoutProps = {
  children: React.ReactNode
  title: string
}

const Layout: FC<LayoutProps> = ({ children, title = 'Default title' }) => {
  return (
    // <ColorModeContextProvider>
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
      <Menu />
      </header>
      <main>
        {children}
      </main>
      {/* <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
        @Udemy 2021
      </footer> */}
    </React.Fragment>
    // </ColorModeContextProvider>
  )
}

export default Layout
