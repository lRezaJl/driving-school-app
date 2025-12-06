/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors (Emerald - Safety/Go)
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        // Secondary Brand Colors (Amber - Warning/Drive)
        secondary: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Base/Neutral Colors (Zinc - Modern Dark)
        dark: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b", // Deepest background
        },
        // Semantic Colors
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
        
        // Custom names for compatibility if needed, but mapped to new palette
        foam: "#f4f4f5", // Mapped to zinc-100
        white: "#ffffff",
        orange: "#f97316",
        darkCharcoal: "#18181b",
        coralRed: "#f43f5e",
        RedTxt: "#ef4444",
        brightBlue: "#3b82f6",
        goldenYellow: "#fbbf24",
      },
      fontFamily: {
        sans: ['var(--font-vazir)', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(12deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-12deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        }
      },
      animation: {
        "rotate-animation": "rotate 0.3s ease-in-out 2",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in": "slideIn 0.3s ease-out forwards",
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glowPrimary': '0 0 15px rgba(16, 185, 129, 0.3)',
        'glowSecondary': '0 0 15px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [require("daisyui")],
};
