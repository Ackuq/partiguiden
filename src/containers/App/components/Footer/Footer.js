import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Ad from '../../../../components/Ad';
import styles from './styles';

const Footer = ({ classes }) => (
  <React.Fragment>
    <Ad />
    <footer className={classes.root}>
      <Grid direction="column" justify="center" container>
        <Grid item>
          <Typography align="center" color="inherit" variant="subtitle1">
            © Axel Pettersson 2019
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" color="inherit" variant="subtitle1">
            <a href="mailto:contact@partiguiden.nu">contact@partiguiden.nu</a>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  </React.Fragment>
);

export default withStyles(styles)(Footer);
