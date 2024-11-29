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
import DrawerProvider from '@/components/DrawerProvider'
const inter = Inter({ subsets: ['latin'] })
import { SpeedInsights } from '@vercel/speed-insights/next'
import ClientApi from '@/services/clientApi'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'

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
    'yến sào',
    'laptop',
    'cây cảnh',
    'nước hoa',
    'cà phê',
    'cửa hàng đa sản phẩm',
    'mua sắm online',
    'sản phẩm chất lượng',
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
    // google: '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk',
    google: 'Sr2q2elTmvBwx7P3aM-ZiaH-3yjcxuGHrMI9H9iCewI',
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
}

const LayoutMain = async ({ children }: { children: React.ReactNode }) => {
  const menuCategory = await ClientApi.getCategory()
  return (
    <html lang='en'>
      {process.env.NEXT_PUBLIC_MODE_PRODUCTION && <GoogleTagManager gtmId='GTM-T7S7DKJ4' />}
      <head>
        {/* Google / Search Engine Tags  */}
        <meta itemProp='name' content={process.env.NEXT_PUBLIC_TITLE} />
        <meta itemProp='description' content={process.env.NEXT_PUBLIC_TITLE_DES} />
        <meta itemProp='image' content={'/favicon.ico'} />

        {process.env.NEXT_PUBLIC_MODE_PRODUCTION && (
          <>
            <meta name='google-site-verification' content='Sr2q2elTmvBwx7P3aM-ZiaH-3yjcxuGHrMI9H9iCewI' />
            {/* <GoogleTagManager gtmId="GTM-T7S7DKJ4" /> */}

            {/* <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-QH99F8WFPW"
              id="google-analytics"
              strategy="afterInteractive"
            >
              {` window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-QH99F8WFPW');`}
            </Script> */}
            {/* <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-T7S7DKJ4')`,
              }}
            /> */}
            {/* <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-QH99F8WFPW"
            /> */}

            {/* <script
              dangerouslySetInnerHTML={{
                __html: ` 
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-QH99F8WFPW');`,
              }}
            /> */}
            <Script
              id='schema'
              type='application/ld+json'
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  name: 'TC Store',
                  url: 'https://tcstore.vercel.app',
                  description:
                    'Chào mừng đến với TC Store! Khám phá đa dạng sản phẩm từ yến sào cao cấp, laptop mới nhất, cây cảnh xanh mát, nước hoa sang trọng đến cà phê thơm ngon và các sản phẩm chất lượng khác. Mua sắm dễ dàng, dịch vụ tận tâm và ưu đãi hấp dẫn đang chờ bạn!',
                  publisher: {
                    '@type': 'Organization',
                    name: 'TC Store',
                  },
                }),
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_MODE_PRODUCTION && (
          <>
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T7S7DKJ4"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
          </>
        )}

        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <AntdRegistry>
              <AntdProvider>
                <ReduxProvider>
                  <MyModalProvider>
                    <DrawerProvider>
                      <ClientRender menuCategory={menuCategory?.data || []}>{children}</ClientRender>
                    </DrawerProvider>
                  </MyModalProvider>
                </ReduxProvider>
              </AntdProvider>
            </AntdRegistry>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
        <SpeedInsights />
      </body>
      {process.env.NEXT_PUBLIC_MODE_PRODUCTION && <GoogleAnalytics gaId='G-QH99F8WFPW' />}
    </html>
  )
}

export default LayoutMain
