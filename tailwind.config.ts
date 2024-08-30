import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'black': '#000',
      'white': '#fff',
      'pink5': '#E33F7A',
      'pink6': 'BF1E58',
      'green5': '#3FCC33',
      'yellow5': '#E5D225',
      'red5': '#E02525',
      'blue5': '#2E4BE5',
      'grey4': 'B0A7AB',
      'grey5': '#3A3034',
      
    },
    extend: {
      borderRadius: {
        xl: '0.714rem'
      },
    },

  },

  plugins: [],
};
export default config;
