import React, { useRef, useState } from 'react';
import Link from 'next/link';

import styled from '@material-ui/styles/styled';

import AppBar from '@material-ui/core/AppBar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import MenuIcon from '@material-ui/icons/Menu';

import NavLinks from './NavLinks';
import Drawer from './Drawer';

import { INDEX } from '../../lib/routes';
import { Brightness6 } from '@material-ui/icons';

const Brand = styled('div')({
  margin: '0.25rem',
  textAlign: 'center',
});

const Banner = styled('div')({
  zIndex: 1200,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 2rem',
  width: '100%',
});

const BannerText = styled('a')(({ theme }: { theme: Theme }) => ({
  textDecoration: 'none',
  fontSize: '2rem',
  paddingLeft: '0.25rem',
  paddingRight: '0.25rem',
  color: theme.palette.primary.contrastText,
}));

interface Props {
  toggleDarkMode: () => void;
}

const Branding: React.FC<Props> = ({ toggleDarkMode }) => (
  <Banner>
    <Brand>
      <ButtonBase>
        <Link href={INDEX} passHref>
          <BannerText>
            <strong>Partiguiden</strong>
          </BannerText>
        </Link>
      </ButtonBase>
    </Brand>
    <IconButton onClick={toggleDarkMode}>
      <Brightness6 />
    </IconButton>
  </Banner>
);

const ColoredAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.primary.main,
}));

const Header: React.FC<Props> = ({ toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const appBar = useRef<HTMLDivElement>();

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

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
