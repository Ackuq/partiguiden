import React from 'react';

import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import PartySymbolTick from '../../PartySymbolTick';

import { AveragePoll, PollDetails } from '../../../lib/polls';

import { PartyAbbreviation } from '../../../utils/parties';
import { partiesMap } from '../../../utils/getParties';
import tooltipProps from '../../../utils/tooltipProps';

import { DefaultTooltipContent } from '../../../types/recharts.d';

const ChartContainer = styled(ResponsiveContainer)({
  marginTop: '1rem',
  marginLeft: '-20px',
});

const PollCard = styled(Paper)({
  padding: '1rem 0.5rem',
});

interface BarrierLabelProps {
  offset?: number;
  viewBox?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

const BarrierLabel: React.FC<BarrierLabelProps> = ({
  offset = 0,
  viewBox = { x: 0, y: 0, width: 0 },
}) => {
  const width = 70;
  const height = 25;

  const x = viewBox.width / 2 + viewBox.x;
  const { y } = viewBox;

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        offset={offset}
        rx="5"
        ry="5"
        width={width}
        height={height}
      />
      <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize={11}>
        4% spärren
      </text>
    </g>
  );
};

interface ToolTipProps {
  payload?: Array<{ name: string; payload?: unknown }>;
}

const CustomToolTip: React.FC<ToolTipProps> = ({ ...props }) => {
  const newProps = props;

  if (props.payload && props.payload[0]) {
    const averagePayload = props.payload[0];

    const details = [...(averagePayload.payload as { details: Array<PollDetails> }).details].map(
      (el) => ({
        name: el.institute,
        value: `${el.value} (${el.published})`,
      })
    );

    newProps.payload = [averagePayload, ...details];
  }
  return <DefaultTooltipContent {...newProps} />;
};

interface Props {
  currentAverage: AveragePoll;
}

const MonthlyPolls: React.FC<Props> = ({ currentAverage }) => {
  const theme = useTheme();
  const shortScreen = useMediaQuery('(max-height:1000px)');
  return (
    <PollCard>
      <Typography variant="h5" align="center">
        Senaste mätningar
      </Typography>
      <ChartContainer height={shortScreen ? 300 : 500}>
        <BarChart data={currentAverage}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="party" tick={<PartySymbolTick />} tickLine={false} />
          <YAxis type="number" />
          <Tooltip content={<CustomToolTip />} {...tooltipProps(theme)} />
          <Bar dataKey="value" name="Genomsnitt" legendType="none">
            {currentAverage.map((el) => (
              <Cell key={el.party} fill={partiesMap[el.party as PartyAbbreviation].color} />
            ))}
          </Bar>
          <ReferenceLine
            y={4}
            stroke="black"
            strokeWidth={2}
            label={<BarrierLabel />}
            textAnchor="middle"
          />
        </BarChart>
      </ChartContainer>
    </PollCard>
  );
};

export default MonthlyPolls;
