import React, { useCallback } from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { styled, useTheme } from "@mui/material/styles";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { AveragePoll, BlocksAverage } from "../../lib/polls";
import { displayFormatter } from "../../lib/polls";

import type { Blocks } from "../../utils/getParties";
import { allBlocks, partiesMap } from "../../utils/getParties";
import { PollCard } from "./utils";
import toolTipProps from "../../utils/tooltipProps";

const BlockDivider = styled(Divider)`
  margin-bottom: 1rem;
`;

const blockSort =
  (blocks: Blocks["values"]) =>
  (a: AveragePoll[number], b: AveragePoll[number]) => {
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
interface Props {
  currentAverage: AveragePoll;
  blockAverage: BlocksAverage;
}

interface BlockProps {
  currentAverage: AveragePoll;
  blockAverage: BlocksAverage[number];
  height: number;
  radius: number;
  blocks: Blocks;
  blocksIndex: number;
}

const Block: React.FC<BlockProps> = ({
  height,
  currentAverage,
  blockAverage,
  radius,
  blocks,
  blocksIndex,
}) => {
  const theme = useTheme();

  const stroke =
    theme.palette.mode === "dark"
      ? "transparent"
      : theme.palette.background.paper;

  const sortedAverage = [...currentAverage].sort(blockSort(blocks.values));

  return (
    <>
      <Typography align="center" variant="h6">
        {blocks.name}
      </Typography>
      <ResponsiveContainer height={height}>
        <PieChart height={height}>
          <Pie
            nameKey="party"
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={sortedAverage}
            cx="50%"
            cy="90%"
            outerRadius={radius}
            stroke={stroke}
          >
            {sortedAverage.map((data, index) => (
              <Cell
                key={`party-${blocksIndex}-${index}`}
                fill={partiesMap[data.party].color}
              />
            ))}
          </Pie>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={blockAverage}
            cx="50%"
            cy="90%"
            innerRadius={radius + 10}
            outerRadius={radius + 30}
            label={(data) => displayFormatter(data.payload.value)}
            stroke={stroke}
          >
            {blocks.values.map(
              (block: Blocks["values"][number], index: number) => (
                <Cell
                  key={`block-${blocksIndex}-${index}`}
                  fill={block.color}
                />
              ),
            )}
          </Pie>
          <Tooltip {...toolTipProps(theme)} formatter={displayFormatter} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

const BlockStatistics: React.FC<Props> = ({ currentAverage, blockAverage }) => {
  const shortScreen = useMediaQuery("(max-height:1000px)");

  const height = shortScreen ? 200 : 350;
  const radius = shortScreen ? 100 : 200;

  const renderBlock = useCallback(
    (block: BlocksAverage[number], index: number) => (
      <React.Fragment key={index}>
        <Block
          currentAverage={currentAverage}
          height={height}
          radius={radius}
          blockAverage={block}
          blocks={allBlocks[index]}
          blocksIndex={index}
        />
        {index !== blockAverage.length - 1 && <BlockDivider />}
      </React.Fragment>
    ),
    [currentAverage, blockAverage, height, radius],
  );

  return (
    <PollCard>
      <Typography variant="h5" align="center" gutterBottom>
        Blockskillnad (senaste mätningar)
      </Typography>
      {blockAverage.map(renderBlock)}
    </PollCard>
  );
};

export default BlockStatistics;
