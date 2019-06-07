import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import CustomizedTick from './CustomizedTick';

import styles from '../../styles';

import createData from './createData';

const RostFordelning = ({ voting, classes }) => {
  const [visible, setVisible] = useState(false);

  const data = createData(voting);

  return (
    <div className={classes.contentContainer}>
      <ButtonBase onClick={() => setVisible(!visible)} classes={{ root: classes.button }}>
        <Typography variant="h5" color="inherit">
          Röstfördelning
        </Typography>
        <ArrowDownRounded
          classes={{
            root: `${classes.arrow} ${visible ? classes.arrowVisible : ''}`
          }}
        />
      </ButtonBase>
      <Collapse in={visible}>
        <ResponsiveContainer height={500} className={classes.chart}>
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
        </ResponsiveContainer>
      </Collapse>
    </div>
  );
};

export default withStyles(styles)(RostFordelning);
