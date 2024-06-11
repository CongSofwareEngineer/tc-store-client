/** @type {import('next').NextConfig} */

import { readFile } from 'fs/promises'

const json = (await readFile(new URL('./env.json', import.meta.url))).toString(
  'utf-8'
)

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    // optimisticClientCache: true,
    // workerThreads: true,
    // optimizeCss: true,
    gzipSize: true,
    swcMinify: true,
    optimizePackageImports: [
      '@nextui-org/react',
      '@tanstack/react-query',
      'framer-motion',
      'styled-components',
      'tailwind-merge',
      '@emotion/reac',
    ],
    // optimizeServerReact: true,
    // serverMinification: true
  },
  env: {
    ...JSON.parse(json),
    NEXT_PUBLIC_PROJECT_ID: '5a998e5a831f4de43423a0ee6314508b',
  },
  compress: true,
  swcMinify: true,
  compiler: {
    reactRemoveProperties: true,
    styledComponents: {
      displayName: true,
      ssr: true,
      minify: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'ipfs.pantograph.app',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'ipfs.pantograph.app/ipfs',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'ipfsgw.bountykinds.com',
      //   pathname: '/**',
      // },

      // {
      //   protocol: 'https',
      //   hostname: 'skywalker.infura-ipfs.io',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'ipfs.filebase.io',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'ucarecdn.com',
      //   pathname: '/**',
      // },
    ],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

export default nextConfig
