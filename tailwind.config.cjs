/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg': '#3B2F2A',
        'surface': '#4A3E38',
        'text': '#F0EAD6',
        'text-light': '#D4C9A8',
        'heading': '#E07A5F',
        'accent': '#3D87A6',
        'border': '#5B4F48',
        'tag-bg': 'rgba(61, 135, 166, 0.15)',
      },
      spacing: {
        '2.5': '2.5px',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      keyframes: {
        blink: {
          '50%': { backgroundColor: 'transparent' }
        }
      },
      animation: {
        blink: 'blink 1s steps(1) infinite'
      }
    },
  },
  plugins: [],
};