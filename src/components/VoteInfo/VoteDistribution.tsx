import React, { useMemo, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { styled, useTheme } from '@mui/material/styles';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Vote, VotingDict } from '../../types/voting';
import { voteColor } from '../../lib/voteColors';
import PartySymbolTick from '../PartySymbolTick';
import RotatingArrow from './shared/RotatingArrow';
import SectionButton from './shared/SectionButton';
import tooltipProps from '../../utils/tooltipProps';

const ChartContainer = styled(ResponsiveContainer)`
  width: calc(100% + 20px) !important;
  margin-top: 1rem;
  margin-left: -20px;
`;

interface Result {
  name: string;
  Ja: string;
  Nej: string;
  Avstående: string;
  Frånvarande: string;
}

const createData = (voting: Vote['voting']) => {
  const result: Array<Result> = [];

  (Object.keys(voting) as (keyof VotingDict)[]).forEach((party) => {
    if (party !== 'noParty' && party !== 'total') {
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
  const theme = useTheme();

  const colors = useMemo(() => voteColor[theme.palette.mode], [theme.palette.mode]);

  const data = createData(voting);

  if (data.length === 0) {
    return (
      <Typography gutterBottom variant="h6" component="span">
        Ingen voteringsdata hittades
      </Typography>
    );
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <SectionButton onClick={() => setVisible(!visible)}>
        <Typography variant="h5" color="inherit" component="span">
          Röstfördelning
        </Typography>
        <RotatingArrow active={visible.toString() as 'true' | 'false'} />
      </SectionButton>
      <Collapse in={visible}>
        <ChartContainer height={500}>
          {data ? (
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" tick={<PartySymbolTick vertical />} />
              <Tooltip {...tooltipProps(theme)} />
              <Legend />
              <Bar dataKey="Ja" stackId="a" fill={colors.yes} />
              <Bar dataKey="Nej" stackId="a" fill={colors.no} />
              <Bar dataKey="Avstående" stackId="a" fill={colors.refrain} />
              <Bar dataKey="Frånvarande" stackId="a" fill={colors.absent} />
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
