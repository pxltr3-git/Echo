/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg': '#1A1A2E',           // Deep Indigo - A dark, mysterious base
        'surface': '#2E2E4A',      // Darker Violet - Slightly lighter for cards/panels
        'text': '#E0E0FF',         // Light Lavender - High contrast, clean text
        'text-light': '#B0B0D0',   // Muted Lavender - Secondary text, less prominent
        'heading': '#00BCD4',      // Vibrant Cyan - Striking, modern heading color
        'accent': '#FF4081',       // Electric Pink/Magenta - Bold, energetic accent
        'border': '#4A4A6A',       // Muted Purple-Gray - Subtle separation
        'tag-bg': 'rgba(255, 64, 129, 0.15)', // Translucent Electric Pink for tags
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