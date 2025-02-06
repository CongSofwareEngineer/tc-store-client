import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = {
  content: [
    './components/**/*.{ts,tsx}',
    './hook/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './hook/**/*.{ts,tsx}',
  ],

  prefix: '',
  theme: {
  	extend: {
  		keyframes: {
  			zoom: {
  				'0%': {
  					transform: 'scale(0)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			},
  			'spin-3': {
  				from: {
  					transform: 'rotate(0deg)'
  				},
  				to: {
  					transform: 'rotate(360deg)'
  				}
  			}
  		},
  		animation: {
  			zoom: 'zoom 0.2s ease-in-out',
  			spin3s: 'spin-3 3s infinite linear'
  		},
  		boxShadow: {
  			full: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  darkMode: ['class', 'class'],
  // corePlugins: {
  //   preflight: false // <== disable this!
  // },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-title': {
          fontFamily: 'var(--font-title) !important',
          fontSize: '40px',
          fontWeight: '700',
        },
        '.text-medium': {},
        '.text-common': {},
        '.desktop': {},
        '.mobile': {},
        '.shadow-gray1': {},
        '.absolute-center': {},
        '.hide-scroll': {},
        '.skeleton-loading': {},
      }

      addUtilities(newUtilities)
    }),
      require("tailwindcss-animate")
],
} satisfies Config

export default config
