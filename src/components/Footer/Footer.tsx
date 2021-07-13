import React from 'react';

import { Grid, Link, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

import { ResponsiveAd } from '../Ad';

const FooterContent = styled.footer`
  padding: 1.5rem 0;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.primary.main};
  box-shadow: 0 -1px 3px rgba(34, 25, 25, 0.4);
  text-align: center;
`;

const Footer: React.FC = () => (
  <>
    <ResponsiveAd />
    <FooterContent>
      <Grid direction="column" justifyContent="center" container>
        <Grid item>
          <Typography align="center" color="inherit" variant="subtitle1" component="span">
            © Axel Pettersson 2021
          </Typography>
        </Grid>
        <Grid item>
          <Link
            align="center"
            color="inherit"
            variant="subtitle1"
            href="mailto:hello@partiguiden.se"
          >
            hello@partiguiden.se
          </Link>
        </Grid>
      </Grid>
    </FooterContent>
  </>
);

export default Footer;
