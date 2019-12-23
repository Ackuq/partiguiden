import React from 'react';
import Link from 'next/link';
import { Grid, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import NavLinks from './NavLinks';
import styles from './styles';

const useStyles = makeStyles(styles);

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container justify="flex-start" alignItems="center" className={classes.banner}>
        <Grid item xs={3} className={classes.brand}>
          <ButtonBase>
            <Link href="/">
              <span className="bannerText">
                <strong>Partiguiden</strong>.nu
              </span>
            </Link>
          </ButtonBase>
        </Grid>
      </Grid>
      <NavLinks />
    </>
  );
};

export default Header;
