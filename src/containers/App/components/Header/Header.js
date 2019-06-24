import React from 'react';
import { Grid, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Link } from '../../../../lib/routes';
import NavLinks from './NavLinks';
import styles from './styles';

const useStyles = makeStyles(styles);

const Header = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container justify="flex-start" alignItems="center" className={classes.banner}>
        <Grid item xs={3} className={classes.brand}>
          <ButtonBase component="div">
            <Link route="/">
              <a>
                <strong>Partiguiden</strong>.nu
              </a>
            </Link>
          </ButtonBase>
        </Grid>
      </Grid>
      <NavLinks />
    </React.Fragment>
  );
};

export default Header;
