import React from 'react';
import Link from 'next/link';

import styled from '@material-ui/styles/styled';

import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

import { Theme } from '@material-ui/core';
import NavLinks from './NavLinks';

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

const Header: React.FC = () => (
  <>
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
    <NavLinks />
  </>
);

export default Header;
