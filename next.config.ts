import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: [
      'moment',
      'lodash',
      '@mantine/core',
      '@mantine/dates',
      '@mantine/hooks',
      '@tanstack/react-query',
      'styled-components',
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compress: true,
  productionBrowserSourceMaps: true,
  cleanDistDir: true,
  compiler: {
    removeConsole: !!process.env.REMOVE_CONSOLE_LOG,
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
    ],
  },
  // webpack: (config) => {
  // 	config.externals.push('pino-pretty', 'lokijs', 'encoding');
  // 	return config;
  // },
}

export default nextConfig
