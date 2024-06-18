// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'serif': ['Roboto', 'serif'],
        'mono': ['Roboto', 'monospace'],
      },
    },
  },
  plugins: [],
};

// .poppins-regular {
//   font-family: "Poppins", sans-serif;
//   font-weight: 400;
//   font-style: normal;
// }