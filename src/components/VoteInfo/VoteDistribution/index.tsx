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

import PartySymbolTick from '../../PartySymbolTick';
import SectionButton from '../SectionButton';
import RotatingArrow from '../RotatingArrow';
import { Vote } from '../../../types/voting';
import { PartyAbbreviation } from '../../../types/party';

const ChartContainer = styled(ResponsiveContainer)({
  width: 'calc(100% + 20px) !important',
  marginTop: '1rem',
  marginLeft: '-20px',
});

interface Result {
  name: string;
  Ja: string;
  Nej: string;
  Avstående: string;
  Frånvarande: string;
}

type key = PartyAbbreviation | '-' | 'Totalt';

const createData = (voting: Vote['voting']) => {
  const result: Array<Result> = [];

  (Object.keys(voting) as key[]).forEach((party) => {
    if (party !== '-' && party !== 'Totalt') {
      result.push({
        name: party,
        Ja: voting[party].yes,
        Nej: voting[party].no,
        Avstående: voting[party].refrain,
        Frånvarande: voting[party].abscent,
      });
    }
  });
  return result;
};

interface Props {
  voting: Vote['voting'];
}

const VoteDistribution: React.FC<Props> = ({ voting }) => {
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
              <YAxis type="category" dataKey="name" tick={<PartySymbolTick vertical />} />
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
