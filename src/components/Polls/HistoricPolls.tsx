import { Paper, styled, Typography } from '@material-ui/core';
import React from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MonthlyAverage } from '../../lib/polls';
import { partyAbbreviations } from '../../types/party.d';
import { partiesMap } from '../../utils/getParties';

const PollCard = styled(Paper)({
  padding: '1rem 0.5rem',
  marginTop: '1rem',
});

interface Props {
  historicPolls: MonthlyAverage;
}

const HistoricPolls: React.FC<Props> = ({ historicPolls }) => {
  return (
    <PollCard>
      <Typography variant="h5" align="center">
        Historisk genomsnitt (senaste 4 åren)
      </Typography>
      <ResponsiveContainer height={500}>
        <LineChart data={historicPolls}>
          <XAxis type="category" dataKey="date" />
          <YAxis type="number" />
          <Tooltip />
          <Legend />
          {partyAbbreviations.map((party) => (
            <Line key={party} dataKey={party} stroke={partiesMap[party].color} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </PollCard>
  );
};

export default HistoricPolls;
