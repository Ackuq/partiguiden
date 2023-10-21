import colors from "tailwindcss/colors";

import { Party } from "@partiguiden/party-data/types";

const partyColors: Record<Party, { DEFAULT: string; dark: string }> = {
  [Party.S]: {
    DEFAULT: colors.rose[600],
    dark: colors.rose[700],
  },
  [Party.SD]: {
    DEFAULT: colors.amber[400],
    dark: colors.amber[600],
  },
  [Party.M]: {
    DEFAULT: colors.blue[600],
    dark: colors.blue[700],
  },
  [Party.MP]: {
    DEFAULT: colors.green[600],
    dark: colors.green[700],
  },
  [Party.L]: {
    DEFAULT: colors.cyan[600],
    dark: colors.cyan[600],
  },
  [Party.KD]: {
    DEFAULT: colors.sky[600],
    dark: colors.sky[700],
  },
  [Party.C]: {
    DEFAULT: colors.emerald[800],
    dark: colors.emerald[900],
  },
  [Party.V]: {
    DEFAULT: colors.red[700],
    dark: colors.red[700],
  },
};

export default partyColors;
