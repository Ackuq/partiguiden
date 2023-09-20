import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "10rem",
      },
    },
    extend: {
      colors: {
        primary: {
          elevated: {
            dark: colors.slate[900],
            light: "#339388",
          },
          DEFAULT: "#00796b",
        },
        background: {
          elevated: {
            dark: {
              DEFAULT: colors.slate[800],
              100: colors.slate[800],
              200: colors.slate[700],
            },
            light: {
              DEFAULT: colors.slate[200],
              100: colors.slate[200],
              200: colors.slate[300],
            },
          },
          dark: colors.slate[950],
          light: colors.slate[50],
        },
        font: {
          dark: colors.slate[50],
          light: colors.slate[950],
          primary: colors.slate[50],
        },
      },
      minWidth: {
        screen: "100vw",
        modal: "35rem",
      },
      minHeight: {
        screen: [
          "100vh", // For browsers not supporting new viewport units
          "100dvh",
        ] as unknown as string,
      },
      aria: {
        "current-page": "current=page",
        "current-false": "current=false",
      },
    },
  },
};
export default config;
