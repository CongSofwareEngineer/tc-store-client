import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@mantine/dates/styles.css'
import '@mantine/core/styles/global.css'

import '@/styles/aos.css'
import ClientRender from '@/components/ClientRender'
import MantineConfig from '@/components/MantineConfig'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import dynamic from 'next/dynamic'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import Footer from '@/components/Footer'
import ClientApi from '@/services/clientApi'
import Script from 'next/script'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const LoadingFirstPage = dynamic(() => import('@/components/LoadingFirstPage'))

const inter = Inter({ subsets: ['latin'] })

const BaseMeta = {
  title: process.env.NEXT_PUBLIC_TITLE,
  description: process.env.NEXT_PUBLIC_TITLE_DES,
  images: process.env.NEXT_PUBLIC_IMAGE,
  url: 'https://tcstore.vercel.app',
}
export const metadata: Metadata = {
  metadataBase: new URL(BaseMeta.url),
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
    url: BaseMeta.url,
    phoneNumbers: ['0392225405', '0397373405'],
    locale: 'vi',
    emails: 'hodiencong2000@gmail.com',
    countryName: 'Vietnamese',
  },
  bookmarks: BaseMeta.url,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  applicationName: BaseMeta.title,
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
    site: BaseMeta.url,
  },
  appleWebApp: {
    title: BaseMeta.title,
    capable: true,
  },
  verification: {
    // google: '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk',
    google: 'Sr2q2elTmvBwx7P3aM-ZiaH-3yjcxuGHrMI9H9iCewI',
  },
  appLinks: {
    web: {
      url: BaseMeta.url,
      should_fallback: true,
    },
  },
  category: 'fashion',
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const menuCategory = await ClientApi.getCategory(true)

  return (
    <html lang='en' {...mantineHtmlProps}>
      {process.env.NEXT_PUBLIC_MODE_PRODUCTION && <GoogleTagManager gtmId='GTM-T7S7DKJ4' />}

      <head>
        <ColorSchemeScript />

        {process.env.NEXT_PUBLIC_MODE_PRODUCTION && (
          <>
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
              strategy='worker'
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
      <body className={`${inter.className} antialiased`}>
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
        <MantineConfig>
          <ReactQueryProvider>
            <StyledComponentsRegistry>
              <ClientRender menuCategory={menuCategory?.data || []}> {children}</ClientRender>
              <Footer />
              <LoadingFirstPage />
            </StyledComponentsRegistry>
          </ReactQueryProvider>
        </MantineConfig>
      </body>
      {process.env.NEXT_PUBLIC_MODE_PRODUCTION && <GoogleAnalytics gaId='G-QH99F8WFPW' />}
    </html>
  )
}
