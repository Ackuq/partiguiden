import React from 'react';

import styled from '@material-ui/styles/styled';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { Theme } from '@material-ui/core';
import { ResponsiveAd } from './Ad';

const FooterContent = styled('footer')(({ theme }: { theme: Theme }) => ({
  padding: '1.5rem 0',
  color: theme.palette.primary.contrastText,
  background: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.primary.main,
  boxShadow: '0 -1px 3px rgba(34, 25, 25, 0.4)',
  textAlign: 'center',
}));

const Footer: React.FC = () => (
  <>
    <ResponsiveAd />
    <FooterContent>
      <Grid direction="column" justify="center" container>
        <Grid item>
          <Typography align="center" color="inherit" variant="subtitle1">
            © Axel Pettersson 2020
          </Typography>
        </Grid>
        <Grid item>
          <Link
            align="center"
            color="inherit"
            variant="subtitle1"
            href="mailto:contact@partiguiden.nu"
          >
            contact@partiguiden.nu
          </Link>
        </Grid>
      </Grid>
    </FooterContent>
  </>
);

export default Footer;
