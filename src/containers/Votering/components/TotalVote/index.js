import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import styles from '../../styles';

const createData = voting => [
  { name: 'Ja', value: parseInt(voting.ja, 10) },
  { name: 'Nej', value: parseInt(voting.nej, 10) },
  { name: 'Avstående', value: parseInt(voting.avstaende, 10) },
  { name: 'Frånvarande', value: parseInt(voting.franvarande, 10) }
];

const COLORS = ['#16a085', '#c0392b', '#7f8c8d', '#34495e'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  payload,
  fill,
  value,
  percent
}) => {
  const RADIAN = Math.PI / 180;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;

  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}`} stroke={fill} fill="none" />
      <circle cx={mx} cy={my} r={2} fill={fill} stroke="none" />
      <text x={mx + (cos >= 0 ? 1 : -1) * 6} y={my} textAnchor={textAnchor} fill={fill}>{`${
        payload.name
      }: ${value}`}</text>
      <text x={mx + (cos >= 0 ? 1 : -1) * 6} y={my} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const TotalVote = ({ voting, classes }) => {
  const data = useState(createData(voting))[0];

  return (
    <React.Fragment>
      {data ? (
        <ResponsiveContainer height={300} className={classes.pieChartContainer}>
          <PieChart>
            <Pie
              data={data}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={5}
              innerRadius={60}
              outerRadius={80}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <CircularProgress />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(TotalVote);
