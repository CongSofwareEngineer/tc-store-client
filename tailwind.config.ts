import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {},
  darkMode: 'class',
  // corePlugins: {
  //   preflight: false // <== disable this!
  // },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-title': {
          fontFamily: 'var(--font-title) !important',
          fontSize: '40px',
          fontWeight: '700'
        },
        '.text-medium': {

        },
        '.text-common': {},
        '.desktop': {},
        '.mobile': {},
        '.shadow-gray1': {},
        '.absolute-center': {},
        '.hide-scroll': {},
        '.skeleton-loading': {}
      }

      addUtilities(newUtilities)
    })
  ]
} satisfies Config

export default config
