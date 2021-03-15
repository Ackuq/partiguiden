import { Paper, styled, Typography, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
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
} from 'recharts';
import moment from 'moment';
import { DefaultTooltipContent } from '../types/recharts.d';
import PartySymbolTick from '../components/PartySymbolTick';
import { getAverage, getWithin, PollDetails } from '../lib/polls';
import { partyAbbrev } from '../types/party';
import { Polls as PollsType } from '../types/polls';
import { partiesMap } from '../utils/getParties';
import { grey } from '@material-ui/core/colors';

interface Props {
  polls: PollsType;
}

const today = moment();
const twoMonthsAgo = moment().subtract(2, 'months');

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
  const y = viewBox.y;

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
  if (props.payload && props.payload[0]) {
    const averagePayload = props.payload[0];

    const details = [...(averagePayload.payload as { details: Array<PollDetails> }).details].map(
      (el) => ({
        name: el.institute,
        value: `${el.value} (${el.published})`,
        color: grey[800],
      })
    );

    props.payload = [averagePayload, ...details];
  }
  return <DefaultTooltipContent {...props} />;
};

const MonthlyPolls: React.FC<Props> = ({ polls }) => {
  const shortScreen = useMediaQuery('(max-height:1000px)');

  const [barChart, setBarChart] = useState<
    Array<{ name: string; value: number; details: Array<PollDetails> }>
  >();

  useEffect(() => {
    const average = getAverage(getWithin(polls, twoMonthsAgo.toDate(), today.toDate()));
    const barChartData = Object.keys(average).map((party) => ({
      name: party,
      value: average[party as partyAbbrev][0],
      details: average[party as partyAbbrev][1],
    }));
    setBarChart(barChartData);
  }, []);

  return (
    <PollCard>
      <Typography variant="h5" align="center">
        Senaste mätningar
      </Typography>
      <ChartContainer height={shortScreen ? 300 : 500}>
        <BarChart data={barChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="name" tick={<PartySymbolTick />} tickLine={false} />
          <YAxis
            type="number"
            domain={[0, Math.ceil(Math.max.apply(Math, barChart?.map((el) => el.value) || [])) + 2]}
          />
          <Tooltip content={<CustomToolTip />} />
          <Bar dataKey="value" name="Genomsnitt" legendType="none">
            {barChart?.map((el) => (
              <Cell key={el.name} fill={partiesMap[el.name as partyAbbrev].color} />
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
