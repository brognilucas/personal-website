/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Fraunces",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },
      boxShadow: {
        soft:
          "0 2px 16px -4px rgb(0 0 0 / 0.06), 0 8px 40px -12px rgb(0 0 0 / 0.08)",
        "soft-lg":
          "0 4px 24px -6px rgb(0 0 0 / 0.08), 0 16px 48px -16px rgb(0 0 0 / 0.1)",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
