/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#c2410c", // ✅ shadcn red-orange
          foreground: "#fff7ed",
          dark: "#fb923c",
        },

        secondary: {
          DEFAULT: "#f5f5f5",
          foreground: "#262626",
          dark: "#262626",
        },

        accent: {
          DEFAULT: "#f5f5f5",
          foreground: "#262626",
          dark: "#262626",
        },

        background: {
          DEFAULT: "#ffffff",
          dark: "#0a0a0a",
        },

        card: {
          DEFAULT: "#ffffff",
          dark: "#171717",
        },

        border: {
          DEFAULT: "#e5e5e5",
          dark: "#262626",
        },

        foreground: {
          DEFAULT: "#171717",
          dark: "#fafafa",
        },

        muted: {
          DEFAULT: "#737373",
          dark: "#a3a3a3",
        },

        destructive: {
          DEFAULT: "#dc2626",
          dark: "#f87171",
        },

        success: {
          DEFAULT: "#16a34a",
          dark: "#4ade80",
        },

        warning: {
          DEFAULT: "#f59e0b",
          dark: "#fbbf24",
        },

        // ✅ Chart colors (red-orange spectrum)
        chart1: "#fb923c",
        chart2: "#f97316",
        chart3: "#ea580c",
        chart4: "#c2410c",
        chart5: "#9a3412",

        // ✅ Sidebar
        sidebar: {
          DEFAULT: "#ffffff",
          foreground: "#171717",
          primary: "#c2410c",
          primaryForeground: "#fff7ed",
          accent: "#f5f5f5",
          accentForeground: "#262626",
          border: "#e5e5e5",
          ring: "#fb923c",
          dark: "#171717",
        },
      },

      borderRadius: {
        DEFAULT: "0.65rem",
      },
    },
  },

  presets: [require("nativewind/preset")],
  plugins: [],
};
