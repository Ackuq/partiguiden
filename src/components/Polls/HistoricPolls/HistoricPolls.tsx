import React, { useState } from 'react';

import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';

import {
  Brush,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { MonthlyAverage } from '../../../lib/polls';

import { PartyAbbreviation, partyAbbreviations } from '../../../utils/parties';
import { partiesMap } from '../../../utils/getParties';
import tooltipProps from '../../../utils/tooltipProps';

const ChartContainer = styled(ResponsiveContainer)`
  margin-top: 1rem;
  margin-left: -20px;
`;

const PollCard = styled(Paper)`
  padding: 1rem 0.5rem;
  margin-top: 1rem;
`;

interface Props {
  historicPolls: MonthlyAverage;
}

const HistoricPolls: React.FC<Props> = ({ historicPolls }) => {
  const [hide, setHide] = useState<Array<PartyAbbreviation>>([]);
  const theme = useTheme();

  const hideParty = (party: PartyAbbreviation) => {
    setHide((prev) => [...prev, party]);
  };

  const showParty = (party: PartyAbbreviation) => {
    setHide((prev) => prev.filter((p) => p !== party));
  };

  const onClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    const party = (event as unknown as { value: PartyAbbreviation }).value;
    if (hide.includes(party)) {
      showParty(party);
    } else {
      hideParty(party);
    }
  };

  return (
    <PollCard>
      <Typography variant="h5" align="center">
        Historisk genomsnitt (senaste 4 åren)
      </Typography>
      <ChartContainer height={500}>
        <LineChart data={historicPolls}>
          <XAxis type="category" dataKey="date" />
          <YAxis type="number" />
          <Tooltip {...tooltipProps(theme)} />
          <Legend wrapperStyle={{ marginLeft: 30, bottom: -5 }} fill="#000" onClick={onClick} />
          {partyAbbreviations.map((party) => (
            <Line
              key={party}
              dataKey={party}
              hide={hide.includes(party)}
              stroke={partiesMap[party].color}
              dot={false}
            />
          ))}
          <Brush
            dataKey="date"
            fill={theme.palette.mode === 'dark' ? theme.palette.grey[700] : 'white'}
            stroke={
              theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[700]
            }
            style={{ marginBottom: 20, color: 'white' }}
          />
        </LineChart>
      </ChartContainer>
    </PollCard>
  );
};

export default HistoricPolls;
