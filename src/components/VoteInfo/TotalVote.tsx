import React, { useMemo } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Legend, Tooltip } from 'recharts';
import { votingEntry } from '../../types/voting';
import { useTheme } from '@material-ui/core';
import { voteColor } from '../../lib/voteColors';
import tooltipProps from '../../utils/tooltipProps';

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
  const theme = useTheme();
  const colors = useMemo(() => voteColor[theme.palette.type], [theme.palette.type]);

  /* Special case if all is blank */
  if (Object.values(voting).every((v) => v === '')) {
    return null;
  }

  const data = parseData(voting);

  return (
    <>
      {data ? (
        <ResponsiveContainer height={90}>
          <BarChart data={[data]} layout="vertical" margin={{ left: -60 }}>
            <XAxis type="number" domain={[0, 349]} tickCount={10} />
            <YAxis type="category" dataKey="name" tick={false} />
            <Tooltip {...tooltipProps(theme)} />
            <Legend wrapperStyle={{ marginLeft: 30 }} />
            <Bar
              animationDuration={data.Ja * animationDuration}
              animationEasing="linear"
              dataKey="Ja"
              stackId="a"
              fill={colors.yes}
            />
            <Bar
              animationBegin={data.Ja * animationDelay}
              animationDuration={data.Nej * animationDuration}
              animationEasing="linear"
              dataKey="Nej"
              stackId="a"
              fill={colors.no}
            />
            <Bar
              animationBegin={(data.Ja + data.Nej) * animationDelay}
              animationDuration={data.Avstående * animationDuration}
              animationEasing="linear"
              dataKey="Avstående"
              stackId="a"
              fill={colors.refrain}
            />
            <Bar
              animationBegin={(data.Ja + data.Nej + data.Avstående) * animationDelay}
              animationDuration={data.Frånvarande * animationDuration}
              animationEasing="linear"
              dataKey="Frånvarande"
              stackId="a"
              fill={colors.absent}
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
