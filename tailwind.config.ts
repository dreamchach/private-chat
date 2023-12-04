import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors : {
        'basic-green' : '#4be5b7',
        'hover-green' : '#23c393',
        'blow-green' : '#8fefd4',
        'none-button' : '#f5f5f5',
        'none-text' : '#cbcbcb',
        'buble-yellow' : '#ffdf9e'
      },
      minWidth : {
        '300' : '300px'
      },
      width : {
        '300' : '300px',
        '200' : '200px'
      },
      height : {
        '90vh' : '90vh'
      }
    },
  },
  plugins: [],
}
export default config
