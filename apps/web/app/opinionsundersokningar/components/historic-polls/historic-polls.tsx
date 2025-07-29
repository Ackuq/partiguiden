"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import type { LegendProps } from "recharts";
import {
  Brush,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

import CustomTooltip from "@components/charts/tooltip";
import type { MonthlyAverage } from "@lib/api/polls/types";
import { partyColors } from "@lib/colors/party";
import type { Party } from "@partiguiden/party-data/types";
import { parties } from "@partiguiden/party-data/types";

interface Props {
  historicPolls: MonthlyAverage;
}

export default function HistoricPolls({ historicPolls }: Props) {
  const { theme } = useTheme();
  const [hide, setHide] = useState<Party[]>([]);

  const hideParty = (party: Party) => {
    setHide((prev) => [...prev, party]);
  };

  const showParty = (party: Party) => {
    setHide((prev) => prev.filter((p) => p !== party));
  };

  const onClick: LegendProps["onClick"] = (data) => {
    const party = data.value as Party;
    if (hide.includes(party)) {
      showParty(party);
    } else {
      hideParty(party);
    }
  };

  return (
    <div className="h-[30rem]">
      <ResponsiveContainer>
        <LineChart data={historicPolls}>
          <XAxis type="category" dataKey="date" />
          <YAxis type="number" unit="%" width={35} />
          <Tooltip content={CustomTooltip} cursor={false} />
          <Legend fill="#000" onClick={onClick} />
          {Object.values(parties).map((party) => (
            <Line
              key={party}
              dataKey={party}
              hide={hide.includes(party)}
              stroke={partyColors[party]}
              dot={false}
              unit="%"
            />
          ))}
          <Brush
            dataKey="date"
            className="[&_text]:fill-slate-950 dark:[&_text]:fill-slate-50"
            fill={theme === "dark" ? colors.slate[500] : "white"}
            stroke={theme === "dark" ? colors.slate[900] : colors.slate[500]}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
