"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { VotingEntry } from "@lib/api/vote/types";
import { useTheme } from "next-themes";
import { getThemeVotingColors } from "@lib/colors/voting";
import CustomTooltip from "@components/charts/tooltip";
import CustomLegend from "@components/charts/legend";

const parseData = (voting: VotingEntry) => ({
  name: "Totalt",
  Ja: voting.yes,
  Nej: voting.no,
  Avstående: voting.refrain,
  Frånvarande: voting.absent,
});

interface Props {
  voting: VotingEntry;
}

export default function TotalVote({ voting }: Props) {
  const { theme } = useTheme();
  /* Special case if all is 0 */
  if (Object.values(voting).every((v) => v === 0)) {
    return null;
  }

  const colors = getThemeVotingColors(theme);

  const data = parseData(voting);

  return (
    <div className="h-[6.5rem] sm:h-24">
      <ResponsiveContainer>
        <BarChart data={[data]} layout="vertical">
          <XAxis type="number" domain={[0, 349]} tickCount={10} />
          <YAxis type="category" dataKey="name" tick={false} width={0} />
          <Tooltip cursor={false} content={CustomTooltip} />
          <Legend content={CustomLegend} />
          <Bar
            isAnimationActive={false}
            dataKey="Ja"
            stackId="a"
            fill={colors.yes}
            className="fill-voting-yes dark:fill-voting-yes-dark"
          />
          <Bar
            isAnimationActive={false}
            dataKey="Nej"
            stackId="a"
            fill={colors.no}
          />
          <Bar
            isAnimationActive={false}
            dataKey="Avstående"
            stackId="a"
            fill={colors.refrain}
          />
          <Bar
            isAnimationActive={false}
            dataKey="Frånvarande"
            stackId="a"
            fill={colors.absent}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
