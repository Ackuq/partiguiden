import type { Config } from "tailwindcss";

import { committeeColors } from "./lib/colors/committee";
import { partyColors } from "./lib/colors/party";

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
      colors: {
        party: {
          ...partyColors,
        },
        committee: {
          ...committeeColors,
        },
      },
      aria: {
        "current-page": "current=page",
        "current-false": "current=false",
        visible: "hidden=false",
      },
    },
  },
};

export default config;
