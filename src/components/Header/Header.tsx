import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';

import { Grid, makeStyles, styled } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import MenuIcon from '@material-ui/icons/Menu';
import BrightnessIcon from '@material-ui/icons/Brightness6';

import NavLinks from './NavLinks';
import Drawer from './Drawer';

import { INDEX } from '../../lib/routes';

const useStyles = makeStyles((theme) => ({
  brand: {
    margin: '0.25rem',
    textAlign: 'center',
  },
  iconContainer: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'right',
    },
  },
  banner: {
    zIndex: 1200,
    justifyContent: 'space-between',
  },

  bannerText: {
    textDecoration: 'none',
    fontSize: '2rem',
    paddingLeft: '0.25rem',
    paddingRight: '0.25rem',
    color: theme.palette.primary.contrastText,
  },
}));

interface Props {
  toggleDarkMode: () => void;
}

const Branding: React.FC<Props> = ({ toggleDarkMode }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.banner}>
      <Grid item xs={3} className={classes.brand}>
        <ButtonBase>
          <Link href={INDEX} passHref>
            <a className={classes.bannerText}>
              <strong>Partiguiden</strong>
            </a>
          </Link>
        </ButtonBase>
      </Grid>
      <Grid item xs={3} className={classes.iconContainer}>
        <IconButton onClick={toggleDarkMode}>
          <BrightnessIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const ColoredAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.primary.main,
}));

const Header: React.FC<Props> = ({ toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const appBar = useRef<HTMLDivElement>();

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <ColoredAppBar position="sticky" ref={appBar}>
      <Hidden smUp implementation="css">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={openDrawer} edge="start">
            <MenuIcon />
          </IconButton>
          <Branding toggleDarkMode={toggleDarkMode} />
        </Toolbar>
        <Drawer
          isOpen={drawerOpen}
          appBarHeight={appBar.current?.clientHeight ?? 56}
          handleClose={closeDrawer}
          handleOpen={openDrawer}
        />
      </Hidden>
      <Hidden xsDown implementation="css">
        <Branding toggleDarkMode={toggleDarkMode} />
        <NavLinks />
      </Hidden>
    </ColoredAppBar>
  );
};

export default Header;
