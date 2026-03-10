import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors are canonical in styles/abstracts/_variables.scss
      // Duplicated here only to enable Tailwind utility classes in .tsx files
      colors: {
        concrete: '#1a1a18',
        steel:    '#2c2c28',
        cement:   '#3d3d38',
        dust:     '#8a8a7a',
        sand:     '#c4b89a',
        lime:     '#e8dfc8',
        gold:     '#d4a843',
        ember:    '#c4571a',
        moss:     '#5a8a4a',
        surface:  '#22221e',
        card:     '#262622',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm:   ['var(--font-dm-sans)', 'sans-serif'],
      },
      maxWidth: { app: '1300px' },
      animation: {
        'pulse-dot': 'pulse-dot 2s infinite',
        'fade-up':   'fade-up 0.3s ease',
      },
      keyframes: {
        'pulse-dot': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        'fade-up':   { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

export default config
