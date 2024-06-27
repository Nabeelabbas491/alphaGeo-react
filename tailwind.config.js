/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2lg' : '1.1875rem'
      },
      letterSpacing : {
        'sidebar' : '0.6px',
        'alphageo' : '2px'
      }
    },
    colors : {
      'white' : '#ffffff',
      'disabled' : '#cdcdcd',
      'sidebar' : '#595656'
    },
    height : {
      'button' : '33px'
    },
    borderWidth : {
      '1' : '1px'
    },
  },
  plugins: [],
}