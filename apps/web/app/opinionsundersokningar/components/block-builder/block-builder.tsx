"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { LegendProps } from "recharts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ReferenceLineLabel from "@components/charts/reference-line-label";
import { useCustomTooltip } from "@components/charts/tooltip";
import type { AveragePoll } from "@lib/api/polls/types";
import { partyLogo } from "@lib/assets";
import { partyColors } from "@lib/colors/party";
import type { Party } from "@partiguiden/party-data/types";
import { partyNames } from "@partiguiden/party-data/utils";

interface Props {
  currentMonthAverage: AveragePoll;
}

type StackedData = Record<Party | "total", number>;

const toStackedData = (data: AveragePoll, included: Party[]): StackedData => {
  const withParties = data.reduce(
    (prev, current) => ({ ...prev, [current.party]: current.value }),
    {} as StackedData,
  );
  const total = (included
    .map((party) => withParties[party])
    .reduce((prev, curr) => prev + curr, 0)
    .toFixed(2) + "%") as unknown as number;
  return { ...withParties, total };
};

export default function BlockBuilder({ currentMonthAverage }: Props) {
  const [included, setIncluded] = useState<Party[]>([]);

  const includeParty = (party: Party) => {
    setIncluded((prev) => [...prev, party]);
  };

  const removeParty = (party: Party) => {
    setIncluded((prev) => prev.filter((p) => p !== party));
  };

  const onClick: LegendProps["onClick"] = (data) => {
    const party = data.value as Party;
    if (included.includes(party)) {
      removeParty(party);
    } else {
      includeParty(party);
    }
  };

  const stackedData = useMemo(
    () => toStackedData(currentMonthAverage, included),
    [currentMonthAverage, included],
  );

  const nameFormatter = (name: string) => {
    return partyNames[name as Party] || name;
  };

  const CustomTooltip = useCustomTooltip({ nameFormatter });

  return (
    <div className="h-[40rem]">
      <ResponsiveContainer>
        <BarChart data={[stackedData]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="total" />
          <YAxis type="number" unit="%" domain={[0, 100]} width={40} />
          <Tooltip content={CustomTooltip} cursor={false} />
          {currentMonthAverage.map((partyPoll) => (
            <Bar
              hide={!included.includes(partyPoll.party)}
              dataKey={partyPoll.party}
              stackId="a"
              key={partyPoll.party}
              fill={partyColors[partyPoll.party]}
              unit="%"
            />
          ))}
          <Legend
            formatter={(_value, entry) => {
              const party = entry.value as Party;
              const partyName = partyNames[party];
              return (
                <Image
                  src={partyLogo(party)}
                  alt={`${partyName} logo`}
                  width={40}
                  height={40}
                  style={{
                    filter: `grayscale(${
                      "inactive" in entry && entry.inactive ? "75%" : 0
                    })`,
                  }}
                />
              );
            }}
            onClick={onClick}
            iconSize={0}
          />
          <ReferenceLine
            y={50}
            stroke="black"
            strokeWidth={2}
            label={<ReferenceLineLabel title="50%" />}
            textAnchor="middle"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
