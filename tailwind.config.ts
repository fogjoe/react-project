import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {},

      padding: {
        tabContent: 'var(--p-tab-content)'
      },

      margin: {
        tabContent: 'var(--p-tab-content)'
      }
    }
  },

  corePlugins: {
    preflight: false
  },

  plugins: []
}
export default config
