"use client";
import CustomLegend from "@components/charts/legend";
import PartySymbolTick from "@components/charts/party-symbol-tick";
import CustomTooltip from "@components/charts/tooltip";
import type { VotingDict } from "@lib/api/vote/types";
import { getThemeVotingColors } from "@lib/colors/voting";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Result {
  name: string;
  Ja: number;
  Nej: number;
  Avstående: number;
  Frånvarande: number;
}

const createData = (voting: VotingDict) => {
  const result: Array<Result> = [];

  (Object.keys(voting) as (keyof VotingDict)[]).forEach((party) => {
    if (party !== "noParty" && party !== "total") {
      result.push({
        name: party,
        Ja: voting[party].yes,
        Nej: voting[party].no,
        Avstående: voting[party].refrain,
        Frånvarande: voting[party].absent,
      });
    }
  });
  return result;
};

interface Props {
  voting: VotingDict;
}

export default function VoteDistribution({ voting }: Props) {
  const { theme } = useTheme();
  const votingColors = getThemeVotingColors(theme);
  const data = createData(voting);

  if (data.length === 0) {
    return <p className="text-xl sm:text-2xl">Ingen voteringsdata hittades</p>;
  }

  return (
    <ResponsiveContainer height={500}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          tick={<PartySymbolTick vertical />}
          width={30}
        />
        <Tooltip content={CustomTooltip} cursor={false} />
        <Legend content={CustomLegend} />
        <Bar dataKey="Ja" stackId="a" fill={votingColors.yes} />
        <Bar dataKey="Nej" stackId="a" fill={votingColors.no} />
        <Bar dataKey="Avstående" stackId="a" fill={votingColors.refrain} />
        <Bar dataKey="Frånvarande" stackId="a" fill={votingColors.absent} />
      </BarChart>
    </ResponsiveContainer>
  );
}
