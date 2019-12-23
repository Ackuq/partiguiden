import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import Ad from '../Ad';
import styles from './styles';

const useStyles = makeStyles(styles);

const Footer = () => {
  const classes = useStyles();
  return (
    <>
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
    </>
  );
};
export default Footer;
