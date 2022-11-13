import { Box } from '@mui/material'
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
    <Box sx={{ bgcolor: "text.primary"}}>
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      
      <Menu />
      
      <Box component="main" sx={{mt: -3}}>
        {children}
      </Box>
      {/* <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
        @Udemy 2021
      </footer> */}
      </div>
    </Box>
  )
}

export default Layout
