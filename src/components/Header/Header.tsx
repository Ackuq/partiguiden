import React, { useRef, useState } from 'react';
import Link from 'next/link';

import styled from '@material-ui/styles/styled';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import MenuIcon from '@material-ui/icons/Menu';

import NavLinks from './NavLinks';
import Drawer from './Drawer';

const Brand = styled(Grid)({
  margin: '0.25rem',
  textAlign: 'center',
});

const Banner = styled(Grid)(({ theme }: { theme: Theme }) => ({
  zIndex: 1200,
  backgroundColor: theme.palette.primary.main,
}));

const BannerText = styled('span')(({ theme }: { theme: Theme }) => ({
  textDecoration: 'none',
  fontSize: '2rem',
  paddingLeft: '0.25rem',
  paddingRight: '0.25rem',
  color: theme.palette.primary.contrastText,
}));

const Branding = () => (
  <Banner container justify="flex-start" alignItems="center">
    <Brand item xs={3}>
      <ButtonBase>
        <Link href="/">
          <BannerText>
            <strong>Partiguiden</strong>
          </BannerText>
        </Link>
      </ButtonBase>
    </Brand>
  </Banner>
);

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const appBar = useRef<HTMLDivElement>();

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar position="sticky" ref={appBar}>
      <Hidden smUp>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={openDrawer} edge="start">
            <MenuIcon />
          </IconButton>
          <Branding />
        </Toolbar>
        <Drawer
          isOpen={drawerOpen}
          appBarHeight={appBar.current?.clientHeight ?? 56}
          handleClose={closeDrawer}
          handleOpen={openDrawer}
        />
      </Hidden>
      <Hidden smDown>
        <Branding />
        <NavLinks />
      </Hidden>
    </AppBar>
  );
};

export default Header;
