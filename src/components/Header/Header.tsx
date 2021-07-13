import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';

import { Grid, AppBar, ButtonBase, Hidden, IconButton, Toolbar } from '@material-ui/core';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import MenuIcon from '@material-ui/icons/Menu';
import BrightnessIcon from '@material-ui/icons/Brightness6';

import NavLinks from './NavLinks';
import Drawer from './Drawer';

import { INDEX } from '../../lib/routes';

const BannerText = styled.a`
  text-decoration: none;
  font-size: 2rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

interface Props {
  toggleDarkMode: () => void;
}

const Branding: React.FC<Props> = ({ toggleDarkMode }) => {
  return (
    <Grid container zIndex={1200} justifyContent="space-between">
      <Grid item xs={3} textAlign="center">
        <ButtonBase>
          <Link href={INDEX} passHref>
            <BannerText>
              <strong>Partiguiden</strong>
            </BannerText>
          </Link>
        </ButtonBase>
      </Grid>
      <Grid
        item
        xs={3}
        css={(theme) => css`
          text-align: center;
          ${theme.breakpoints.down('sm')} {
            text-align: right;
          }
        `}
      >
        <IconButton onClick={toggleDarkMode} aria-label="Toggle dark mode">
          <BrightnessIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const Header: React.FC<Props> = ({ toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const appBar = useRef<HTMLDivElement>(null);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <AppBar
      position="sticky"
      ref={appBar}
      css={(theme) => css`
        background-color: ${theme.palette.mode === 'dark'
          ? theme.palette.background.paper
          : theme.palette.primary.main};
      `}
    >
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
      <Hidden smDown implementation="css">
        <Branding toggleDarkMode={toggleDarkMode} />
        <NavLinks />
      </Hidden>
    </AppBar>
  );
};

export default Header;
