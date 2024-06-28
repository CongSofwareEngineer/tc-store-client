import { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import AntdProvider from '@/components/AntdProvider'
import ReduxProvider from '@/components/ReduxProvider'
import MyModalProvider from '@/components/MyModal'
import '@/styles/globals.scss'
import '@/styles/override.scss'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import StyledComponentsRegistry from '@/components/RegistryApp'
import ClientRender from '@/components/ClientRender'
import type { Viewport } from 'next'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import fetchConfig from '@/configs/fetchConfig'
import DrawerProvider from '@/components/DrawerProvider'
const inter = Inter({ subsets: ['latin'] })
import { SpeedInsights } from '@vercel/speed-insights/next'
const BaseMeta = {
  title: process.env.NEXT_PUBLIC_TITLE,
  description: process.env.NEXT_PUBLIC_TITLE_DES,
  images: process.env.NEXT_PUBLIC_IMAGE,
}
export const metadata: Metadata = {
  metadataBase: new URL('https://tcstore.vercel.app/'),
  title: BaseMeta.title,
  description: BaseMeta.description,
  keywords: [
    'Coffee Tây Nguyên',
    'Cà Phê Tây Nguyên',
    'TC Store',
    'TC Shop',
    'Cà phê Gia Lai',
  ],
  openGraph: {
    title: BaseMeta.title,
    description: BaseMeta.description,
    images: BaseMeta.images,
    siteName: BaseMeta.title,
    url: 'https://tcstore.vercel.app',
  },
  bookmarks: 'https://tcstore.vercel.app',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: { url: '/favicon.ico' },
    shortcut: { url: '/favicon.ico' },
    apple: { url: '/favicon.ico' },
  },
  manifest: '/manifest.json',
  twitter: {
    title: BaseMeta.title,
    description: BaseMeta.description,
    card: 'summary_large_image',
    images: BaseMeta.images,
  },
  appleWebApp: {
    title: BaseMeta.title,
  },
  verification: {
    google: '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk',
  },
  appLinks: {
    web: {
      url: 'https://tcstore.vercel.app',
      should_fallback: true,
    },
  },
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const LayoutMain = async ({ children }: { children: React.ReactNode }) => {
  const menuCategory = await fetchConfig({
    url: 'menu-category',
  })
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <AntdRegistry>
              <AntdProvider>
                <ReduxProvider>
                  <MyModalProvider>
                    <DrawerProvider>
                      <ClientRender menuCategory={menuCategory?.data || []}>
                        {children}
                      </ClientRender>
                    </DrawerProvider>
                  </MyModalProvider>
                </ReduxProvider>
              </AntdProvider>
            </AntdRegistry>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}

export default LayoutMain
