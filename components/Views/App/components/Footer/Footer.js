import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Ad from 'react-google-publisher-tag';

import styles from './styles';

const Footer = ({ classes }) => (
  <React.Fragment>
    <div className="responsive-ad">
      <Ad canBeLower={false} id="footer-ad" path="/21821978280/responsive-ad" />
    </div>
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
  </React.Fragment>
);

export default withStyles(styles)(Footer);
