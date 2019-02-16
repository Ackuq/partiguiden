import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const Footer = ({ classes }) => (
  <footer className={classes.root}>
    <Grid direction="column" justify="center" container className="text-center">
      <Grid item>
        <span>© Axel Pettersson 2019</span>
      </Grid>
      <Grid item>
        <span>
          <a href="mailto:contact@partiguiden.nu">contact@partiguiden.nu</a>
        </span>
      </Grid>
    </Grid>
  </footer>
);

export default withStyles(styles)(Footer);
