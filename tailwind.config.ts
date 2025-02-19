// tailwind.config.js
import { heroui } from '@heroui/react'

import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        amaticSc: 'var(--font-amatic-sc)',
        orbitron: 'var(--font-orbitron)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gsp: {
          green: '#085E1A',
          gold: '#D5AB20',
          white: '#FCF9ED',
          red: '#8A1919',
          black: '#26292B',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config
