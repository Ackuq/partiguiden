"use client";

import { useCallback, useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { PieLabelProps } from "recharts/types/polar/Pie";

import { useCustomTooltip } from "@components/charts/tooltip";
import type { AveragePoll, BlocksAverage } from "@lib/api/polls/types";
import { partyColors } from "@lib/colors/party";
import { allBlocks } from "@lib/utils/blocks";
import type { Blocks } from "@lib/utils/blocks";
import { partyNames } from "@partiguiden/party-data/utils";

function blockSort(blocks: Blocks["values"]) {
  return function (a: AveragePoll[number], b: AveragePoll[number]) {
    const indexA = blocks.findIndex((block) => block.parties.includes(a.party));
    const indexB = blocks.findIndex((block) => block.parties.includes(b.party));
    if (indexA < indexB) {
      return -1;
    }
    if (indexA > indexB) {
      return 1;
    }
    return 0;
  };
}
interface BlockProps {
  currentMonthAverage: AveragePoll;
  blockAverage: BlocksAverage[number];
  blocks: Blocks;
}

const Block: React.FC<BlockProps> = ({
  currentMonthAverage,
  blockAverage,
  blocks,
}) => {
  const sortedAverage = useMemo(
    () => [...currentMonthAverage].sort(blockSort(blocks.values)),
    [currentMonthAverage, blocks.values],
  );

  const valueFormatter = useCallback(
    (value: string | number) =>
      typeof value === "number" ? `${value.toFixed(2)}%` : `${value}%"`,
    [],
  );

  const CustomTooltip = useCustomTooltip({ valueFormatter });

  const renderCustomLabel = useCallback((data: PieLabelProps) => {
    const value = (data.payload as { value: number }).value;
    return `${value.toFixed(2)}%`;
  }, []);

  return (
    <>
      <p className="text-center text-lg">{blocks.name}</p>
      <div className="-my-5 h-52 sm:-my-10 sm:h-80">
        <ResponsiveContainer className="overflow-visible [&_.recharts-surface]:overflow-visible">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cy="75%"
              outerRadius="90%"
              data={sortedAverage}
              className="stroke-transparent"
            >
              {sortedAverage.map((data) => (
                <Cell
                  key={data.party}
                  name={partyNames[data.party]}
                  fill={partyColors[data.party]}
                />
              ))}
            </Pie>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={blockAverage}
              cy="75%"
              className="stroke-transparent"
              innerRadius="95%"
              outerRadius="105%"
              label={renderCustomLabel}
            >
              {blocks.values.map((block: Blocks["values"][number]) => (
                <Cell key={block.name} fill={block.color} />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

interface Props {
  currentMonthAverage: AveragePoll;
  blockAverage: BlocksAverage;
}

export default function BlockStatistics({
  currentMonthAverage,
  blockAverage,
}: Props) {
  return (
    <>
      {blockAverage.map((blockAverage, index) => (
        <Block
          key={index}
          currentMonthAverage={currentMonthAverage}
          blockAverage={blockAverage}
          blocks={allBlocks[index]}
        />
      ))}
    </>
  );
}
