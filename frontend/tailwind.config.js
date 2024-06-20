/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-purple': 'var(--primary-purple)',
        'hover-purple': 'var(--hover-purple)',
        'wrapper-bg-grey': 'var(--wrapper-bg-grey)',
        'bg-white': 'var(--bg-white)',
        'admin-indicator-bg': 'var(--admin-indicator-bg)',
        'primary-blue': 'var(--primary-blue)',
      },
    },
  },
  plugins: [],
};
