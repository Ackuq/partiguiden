import React, { useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { styled } from '@material-ui/styles';

import createData from './createData';
import CustomizedTick from './CustomizedTick';
import SectionButton from '../SectionButton';
import RotatingArrow from '../RotatingArrow';

const ChartContainer = styled(ResponsiveContainer)({
  width: 'calc(100% + 20px) !important',
  marginTop: '1rem',
  marginLeft: '-20px',
});

const VoteDistribution: React.FC<{ voting: any }> = ({ voting }) => {
  const [visible, setVisible] = useState(false);

  const data = createData(voting);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <SectionButton onClick={() => setVisible(!visible)}>
        <Typography variant="h5" color="inherit">
          Röstfördelning
        </Typography>
        <RotatingArrow style={visible ? { transform: 'rotate(180deg)' } : undefined} />
      </SectionButton>
      <Collapse in={visible}>
        <ChartContainer height={500}>
          {data ? (
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" tick={<CustomizedTick />} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ja" stackId="a" fill="#16a085" />
              <Bar dataKey="Nej" stackId="a" fill="#c0392b" />
              <Bar dataKey="Avstående" stackId="a" fill="#7f8c8d" />
              <Bar dataKey="Frånvarande" stackId="a" fill="#34495e" />
            </BarChart>
          ) : (
            <CircularProgress />
          )}
        </ChartContainer>
      </Collapse>
    </div>
  );
};

export default VoteDistribution;
