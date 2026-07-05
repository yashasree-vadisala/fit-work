/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Ink: primary text / dark-mode surface. Paper: light-mode surface.
        ink: {
          DEFAULT: "#101828",
          50: "#F5F6F8",
          100: "#E8EAEE",
          200: "#C6CBD5",
          300: "#9AA2B2",
          400: "#6B7385",
          500: "#4A5266",
          600: "#333B4D",
          700: "#232A3A",
          800: "#161C2A",
          900: "#0B0F18",
        },
        paper: {
          DEFAULT: "#F5F6F8",
          soft: "#ECEEF2",
        },
        gold: {
          DEFAULT: "#D9A441",
          light: "#F1C878",
          dark: "#B4842D",
        },
        teal: {
          DEFAULT: "#2A9D8F",
          light: "#5FC1B4",
          dark: "#1E7266",
        },
        coral: {
          DEFAULT: "#E15554",
          light: "#EE8988",
          dark: "#B93F3E",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 2px rgba(16, 24, 40, 0.06), 0 8px 24px rgba(16, 24, 40, 0.06)",
        "panel-dark": "0 1px 2px rgba(0,0,0,0.3), 0 8px 30px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(16,24,40,0.06) 1px, transparent 0)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        dash: {
          to: { strokeDashoffset: 0 },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        scanline: "scanline 2.4s ease-in-out infinite",
        dash: "dash 1.6s ease-out forwards",
        floatSlow: "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
