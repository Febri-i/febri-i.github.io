/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend:{
      fontFamily: {
        'normal': ['Gabarito', 'cursive'],
        'script': ['Miss Fajardose', 'cursive'],
        'important': ['Young Serif', 'serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      }

    },
  },
  plugins: [require("daisyui")],
}

