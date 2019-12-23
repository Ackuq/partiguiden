import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';
import { object } from 'prop-types';

const TotalVote = ({ voting }) => {
  const data = [
    {
      name: 'Totalt',
      Ja: parseInt(voting.ja, 10),
      Nej: parseInt(voting.nej, 10),
      Avstående: parseInt(voting.avstaende, 10),
      Frånvarande: parseInt(voting.franvarande, 10),
    },
  ];

  return (
    <>
      {data ? (
        <ResponsiveContainer height={90}>
          <BarChart data={data} layout="vertical" margin={{ left: -60 }}>
            <XAxis type="number" domain={[0, 349]} tickCount={10} />
            <YAxis type="category" tick={false} />
            <Tooltip />
            <Legend wrapperStyle={{ marginLeft: 30 }} />
            <Bar dataKey="Ja" stackId="a" fill="#16a085" />
            <Bar dataKey="Nej" stackId="a" fill="#c0392b" />
            <Bar dataKey="Avstående" stackId="a" fill="#7f8c8d" />
            <Bar dataKey="Frånvarande" stackId="a" fill="#34495e" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

TotalVote.propTypes = {
  voting: object.isRequired,
};

export default TotalVote;
