import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles';

const LoadCircle = ({ classes }) => (
  <div className={classes.circleContainer}>
    <CircularProgress size={100} />
  </div>
);

export default withStyles(styles)(LoadCircle);
