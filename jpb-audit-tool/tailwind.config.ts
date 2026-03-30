import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a365d',
          light: '#2b6cb0',
        },
        accent: '#2b6cb0',
        success: '#276749',
        warning: '#c05621',
        danger: '#9b2c2c',
        surface: '#f7fafc',
        border: '#e2e8f0',
        'text-primary': '#1a202c',
        'text-secondary': '#4a5568',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
