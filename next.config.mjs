/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  productionBrowserSourceMaps: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    reactRemoveProperties: true,
    styledComponents: {
      displayName: true,
      ssr: true,
      minify: true,
    },
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://tcstore.vercel.app', // Set your origin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}

//for production
if (process.env.NEXT_PUBLIC_ENV === 'production') {
  nextConfig.eslint = {
    ignoreDuringBuilds: true,
  }
  nextConfig.experimental = {
    optimizePackageImports: [
      'moment',
      'lodash',
      '@mantine/core',
      '@mantine/dates',
      '@mantine/hooks',
      '@tanstack/react-query',
      'styled-components',
    ],
  }
  nextConfig.reactStrictMode = true

  nextConfig.compress = true
  nextConfig.productionBrowserSourceMaps = false

  nextConfig.cleanDistDir = true
  nextConfig.compiler = {
    ...nextConfig.compiler,
    removeConsole: true,
  }

  nextConfig.headers = async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://tcstore.vercel.app', // Set your origin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  }
}

export default nextConfig
