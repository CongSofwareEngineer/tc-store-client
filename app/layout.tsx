import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'
import '@mantine/core/styles/global.css'
import '@mantine/dates/styles.css'
import { Inter } from 'next/font/google'

// import '@/styles/aos.css'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import dynamic from 'next/dynamic'

import ClientRender from '@/components/ClientRender'
import Footer from '@/components/Footer'
import MantineConfig from '@/components/MantineConfig'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import ClientApi from '@/services/clientApi'

const LoadingFirstPage = dynamic(() => import('@/components/LoadingFirstPage'))

const inter = Inter({ subsets: ['latin'] })

const BaseMeta = {
  title: process.env.NEXT_PUBLIC_TITLE,
  description: process.env.NEXT_PUBLIC_TITLE_DES,
  images: '/favicon.ico',
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
    phoneNumbers: ['+84392225405', '+84397373405'],
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
    google: '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk',
    // google: 'Sr2q2elTmvBwx7P3aM-ZiaH-3yjcxuGHrMI9H9iCewI',
  },
  appLinks: {
    web: {
      url: BaseMeta.url,
      should_fallback: true,
    },
  },
  category: 'fashion',
  facebook: {
    appId: 'tcstore.gl',
  },
  other: {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'TC Store',
    url: 'https://tcstore.vercel.app',
    logo: BaseMeta.images,
    description: 'Mua sắm giày dép, yến sào, laptop, cà phê và nhiều sản phẩm chất lượng.',

    sameAs: ['https://www.facebook.com/tcstore.gl'],
  },
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const menuCategory = await ClientApi.getCategory()

  return (
    <html {...mantineHtmlProps} lang='vi'>
      {process.env.NEXT_PUBLIC_ENV === 'production' && <GoogleTagManager gtmId='GTM-T7S7DKJ4' />}
      <link href={'https://tcstore.vercel.app'} rel='canonical' />
      <head>
        <ColorSchemeScript />

        {process.env.NEXT_PUBLIC_ENV === 'production' && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Store',
                  name: 'TC Store',
                  url: 'https://tcstore.vercel.app',
                  logo: 'https://bafybeie4dqtbl5dco4qgqbepjttfqrppawkj4evdgoytgoupfdjmfrne2m.ipfs.w3s.link/logo_tc_store.png',
                  description: 'Mua sắm giày dép, yến sào, laptop, cà phê và nhiều sản phẩm chất lượng.',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Thủ Dầu Một',
                    addressLocality: 'Bình Dương',
                    addressCountry: 'Việt nam',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+84-392-225-405',
                    contactType: 'hodiencong2000@gmail.com',
                  },
                }),
              }}
              type='application/ld+json'
            />
          </>
        )}
        <meta
          content="
            default-src 'self' vercel.live *.vercel.app;
            script-src 'self' 'unsafe-eval' 'unsafe-inline' vercel.live https://va.vercel-scripts.com/;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            font-src 'self' https://fonts.gstatic.com;
            img-src 'self' data: https: blob:;
            connect-src 
              'self' 
              https://tcstore.vercel.app 
              https://exuberant-jade-diencong-6e4aa722.koyeb.app
              https://esgoo.net/api-tinhthanh/1/0.htm
              https://vercel.live
              wss://*.vercel.live;
            frame-src 'self' vercel.live;
            frame-ancestors 'self';
            form-action 'self';
            base-uri 'self';
          "
          httpEquiv='Content-Security-Policy'
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {process.env.NEXT_PUBLIC_ENV === 'production' && (
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
        {process.env.NEXT_PUBLIC_ENV === 'production' && <SpeedInsights />}
      </body>
      {process.env.NEXT_PUBLIC_ENV === 'production' && <GoogleAnalytics gaId='G-QH99F8WFPW' />}
    </html>
  )
}
