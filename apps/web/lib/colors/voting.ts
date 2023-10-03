import colors from "tailwindcss/colors";

export const votingColors = {
  yes: {
    light: colors.emerald[300],
    DEFAULT: colors.teal[500],
    dark: colors.teal[700],
  },
  no: {
    light: colors.red[200],
    DEFAULT: colors.red[500],
    dark: colors.red[800],
  },
  refrain: {
    DEFAULT: colors.slate[500],
    dark: colors.slate[500],
  },
  absent: {
    DEFAULT: colors.gray[700],
    dark: colors.gray[400],
  },
  losing: {
    DEFAULT: colors.slate[200],
    dark: colors.slate[600],
  },
};

export function getThemeVotingColors(
  theme?: string,
): Record<keyof typeof votingColors, string> {
  const keys = Object.keys(votingColors) as (keyof typeof votingColors)[];

  return keys.reduce(
    (prev, current) => ({
      ...prev,
      [current]: votingColors[current][theme === "dark" ? "dark" : "DEFAULT"],
    }),
    { yes: "", no: "", refrain: "", absent: "", losing: "" },
  );
}
