import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';
import { votingEntry } from '../../types/voting';

const animationDelay = 2;
const animationDuration = 2;

const parseData = (voting: votingEntry) => ({
  name: 'Totalt',
  Ja: parseInt(voting.yes, 10),
  Nej: parseInt(voting.no, 10),
  Avstående: parseInt(voting.refrain, 10),
  Frånvarande: parseInt(voting.abscent, 10),
});

interface Props {
  voting: votingEntry;
}

const TotalVote: React.FC<Props> = ({ voting }) => {
  const data = parseData(voting);

  return (
    <>
      {data ? (
        <ResponsiveContainer height={90}>
          <BarChart data={[data]} layout="vertical" margin={{ left: -60 }}>
            <XAxis type="number" domain={[0, 349]} tickCount={10} />
            <YAxis type="category" dataKey="name" tick={false} />
            <Tooltip />
            <Legend wrapperStyle={{ marginLeft: 30 }} />
            <Bar
              animationDuration={data.Ja * animationDuration}
              animationEasing="linear"
              dataKey="Ja"
              stackId="a"
              fill="#16a085"
            />
            <Bar
              animationBegin={data.Ja * animationDelay}
              animationDuration={data.Nej * animationDuration}
              animationEasing="linear"
              dataKey="Nej"
              stackId="a"
              fill="#c0392b"
            />
            <Bar
              animationBegin={(data.Ja + data.Nej) * animationDelay}
              animationDuration={data.Avstående * animationDuration}
              animationEasing="linear"
              dataKey="Avstående"
              stackId="a"
              fill="#7f8c8d"
            />
            <Bar
              animationBegin={(data.Ja + data.Nej + data.Avstående) * animationDelay}
              animationDuration={data.Frånvarande * animationDuration}
              animationEasing="linear"
              dataKey="Frånvarande"
              stackId="a"
              fill="#34495e"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default TotalVote;
