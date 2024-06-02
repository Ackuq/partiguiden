"use client";

import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PartySymbolTick from "@components/charts/party-symbol-tick";
import ReferenceLineLabel from "@components/charts/reference-line-label";
import CustomTooltip from "@components/charts/tooltip";
import type { AveragePoll } from "@lib/api/polls/types";
import { getThemePartyColors } from "@lib/colors/party";
import type { Party } from "@partiguiden/party-data/types";
import { partyNames } from "@partiguiden/party-data/utils";

interface Props {
  currentMonthAverage: AveragePoll;
}

export default function MonthPoll({ currentMonthAverage }: Props) {
  const { theme } = useTheme();
  const partyColors = getThemePartyColors(theme);
  return (
    <div className="h-96 sm:h-[30rem]">
      <ResponsiveContainer>
        <BarChart data={currentMonthAverage}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="category"
            dataKey="party"
            tick={<PartySymbolTick />}
            tickLine={false}
          />
          <YAxis type="number" unit="%" width={35} />
          <Tooltip
            cursor={false}
            labelFormatter={(label) => {
              return partyNames[label as Party];
            }}
            content={
              <CustomTooltip
                Details={({ payload }) => {
                  const item = payload?.[0]?.payload as
                    | AveragePoll[number]
                    | undefined;
                  const details = item?.details;
                  if (!details) {
                    return;
                  }
                  return (
                    <>
                      <hr className="dark:border-slate-500" />
                      {details.map((data) => (
                        <li key={data.institute} className="flex gap-2">
                          <span>{data.institute}:</span>
                          <span>
                            {data.value}% (
                            {data.publishedDate.toISOString().split("T")[0]})
                          </span>
                        </li>
                      ))}
                    </>
                  );
                }}
              />
            }
          />
          <Bar dataKey="value" name="Genomsnitt" legendType="none" unit="%">
            {currentMonthAverage.map((partyPoll) => (
              <Cell key={partyPoll.party} fill={partyColors[partyPoll.party]} />
            ))}
          </Bar>
          <ReferenceLine
            y={4}
            stroke="black"
            strokeWidth={2}
            label={<ReferenceLineLabel title="4% spärren" />}
            textAnchor="middle"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
