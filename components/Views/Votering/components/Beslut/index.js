import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import parse from 'html-react-parser';
import styles from '../../styles';

const Beslut = ({ beslut, notisBeskrivning, classes }) => (
  <div className={classes.contentContainer}>
    <Typography variant="h5" color="inherit" gutterBottom>
      Beslut
    </Typography>
    <Typography variant="body1">{beslut}</Typography>
    <Typography variant="h5" color="inherit" gutterBottom style={{ marginTop: '0.5rem' }}>
      Beslut i korthet
    </Typography>
    {parse(notisBeskrivning)}
  </div>
);

export default withStyles(styles)(Beslut);
