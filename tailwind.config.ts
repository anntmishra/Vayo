import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add any other paths where you use Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Default blue, replace with your actual primary color
        'primary-dark': "#2563EB", // Default dark blue, replace with your actual primary dark color
        white: "#ffffff", // Explicitly define white
        gray: {
          900: "#111827", // This matches your text-gray-900
          // Add other gray shades as needed
        },
      },
    },
  },
  plugins: [],
}

export default config