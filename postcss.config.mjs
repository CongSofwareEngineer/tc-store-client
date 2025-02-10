/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-mantine": {
      'mantine-color-body': 'green'
    },
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
        'mantine-color-body': 'green'
      },
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}

export default config
