import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { partyColors } from "@partiguiden/party-data/utils";
import { committeeInfo } from "@lib/committes";

const themeColors = {
  primary: {
    elevated: {
      dark: colors.slate[900],
      light: "#339388",
    },
    dark: "#00554b",
    DEFAULT: "#00796b",
    light: "#80cbc4",
  },
  party: {
    ...partyColors,
  },
  background: {
    elevated: {
      dark: {
        DEFAULT: colors.slate[800],
        100: colors.slate[800],
        200: colors.slate[700],
      },
      light: {
        DEFAULT: colors.slate[100],
        100: colors.slate[100],
        200: colors.slate[200],
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
};

const themeHeight = {
  header: "3.5rem",
  "header-sm": "6rem",
  "header-sm-with-margin": "7rem",
};

const themeWidth = {
  drawer: "18rem",
};

const config: Config = {
  darkMode: "class",
  content: [
    "./lib/styles/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
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
      colors: themeColors,
      height: themeHeight,
      width: themeWidth,
      translate: {
        ...themeWidth,
      },
      spacing: {
        ...themeHeight,
      },
      minWidth: {
        screen: "100vw",
      },
      maxHeight: {
        "full-without-header": [
          `calc(100vh - ${themeHeight["header-sm-with-margin"]})`,
          `calc(100dvh - ${themeHeight["header-sm-with-margin"]})`,
        ] as unknown as string,
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
