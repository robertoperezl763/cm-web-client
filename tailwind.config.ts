import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // main colors are 5... 6-9 are progressively darker, 1-4 are lighter
      'black': '#000',
      'white': '#fff',
      
      'pink1': '#ECA8C0',
      'pink2': '#F887AF',
      'pink3': '#F26C9C',
      'pink4': '#E9578C',
      'pink5': '#E33F7A',
      'pink6': 'BF1E58',
      'pink7': '#A80D45',
      'pink8': '#890735',
      'pink9': '#4E001C',
      
      'green5': '#3FCC33',
      'yellow5': '#E5D225',
      'red5': '#E02525',
      'blue2': '#6B82F8',
      'blue5': '#2E4BE5',

      'grey1': '#EAE7E7',
      'grey2': '#D0CDCE',
      'grey3': '#B0A7AB',
      'grey4': '#8A7B81',
      'grey5': '#3A3034',
      'grey6': '#2A1D21',
    },
    fontSize: {
      sm: ['0.857rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.5' }],
      lg: ['1.25rem', { lineHeight: '1.25' }],
      xl: ['1.5rem', { lineHeight: '1.1' }],
      '2xl': ['1.75rem', { lineHeight: '1' }],
      '3xl': ['2rem', { lineHeight: '1' }]
    },
    extend: {
      borderRadius: {
        xl: '0.714rem'
      },
      spacing: {
        '2.75': '0.714rem'
      }
    }
    
  },
  plugins: [],
};
export default config;
