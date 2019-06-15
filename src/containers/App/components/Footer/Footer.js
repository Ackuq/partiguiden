import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Ad from 'react-google-publisher-tag';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const Footer = ({ classes }) => (
  <React.Fragment>
    {process.env.NODE_ENV === 'production' && (
      <div className="responsive-ad">
        <Ad canBeLower={false} id="footer-ad" path="/21821978280/responsive-ad" />
      </div>
    )}
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
