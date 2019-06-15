import React from 'react';
/* Custom components */
import { Grid, ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from '../../../../lib/routes';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';

/* Material UI components */
import styles from './styles';

const Header = ({ classes }) => (
  <React.Fragment>
    <Grid container justify="center" alignItems="center" className={classes.banner}>
      <Grid item xs={3} className={classes.brand}>
        <ButtonBase component="div">
          <Link route="/">
            <a>
              <strong>Partiguiden</strong>.nu
            </a>
          </Link>
        </ButtonBase>
      </Grid>
      <Grid item xs={3} className={classes.aligner} />
      <Grid item xs={3} className={classes.aligner} />
      <Grid item xs={3} className={classes.searchBar}>
        <SearchBar id="header" />
      </Grid>
    </Grid>
    <NavLinks />
  </React.Fragment>
);

export default withStyles(styles)(Header);
