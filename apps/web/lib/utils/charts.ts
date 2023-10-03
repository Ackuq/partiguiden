import type { useTheme } from "next-themes";
import type { TooltipProps } from "recharts";
import colors from "tailwindcss/colors";

export default function tooltipProps(
  theme: ReturnType<typeof useTheme>["theme"],
): TooltipProps<string | number, string> {
  return {
    cursor: {
      fill: theme === "dark" ? colors.slate[800] : colors.slate[400],
    },
    itemStyle: { color: theme === "dark" ? "white" : "black" },
    labelStyle: { color: theme === "dark" ? "white" : "black" },
  };
}
