import { Paper, styled, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { AveragePoll, BlockAverage } from '../../lib/polls';
import { blocks, partiesMap } from '../../utils/getParties';

const PollCard = styled(Paper)({
  padding: '1rem 0.5rem',
  marginTop: '1rem',
});

interface Props {
  currentAverage: AveragePoll;
  blockAverage: BlockAverage;
}

const BlockStatistics: React.FC<Props> = ({ currentAverage, blockAverage }) => {
  const shortScreen = useMediaQuery('(max-height:1000px)');

  const height = shortScreen ? 200 : 350;
  const radius = shortScreen ? 100 : 200;

  return (
    <PollCard>
      <Typography variant="h5" align="center">
        Blockskillnad (senaste mätningar)
      </Typography>
      <ResponsiveContainer height={height}>
        <PieChart height={height}>
          <Pie
            nameKey="party"
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={currentAverage}
            cx="50%"
            cy="90%"
            outerRadius={radius}
            fill="#8884d8"
          >
            {currentAverage.map((data, index) => (
              <Cell key={`cell-${index}`} fill={partiesMap[data.party].color} />
            ))}
          </Pie>
          <Pie
            data={blockAverage}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="90%"
            innerRadius={radius + 10}
            outerRadius={radius + 30}
            fill="#82ca9d"
            label
          >
            {blocks.map((block, index) => (
              <Cell key={`cell-${index}`} fill={block.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </PollCard>
  );
};

export default BlockStatistics;
