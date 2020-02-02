import React from 'react';

import styled from '@material-ui/styles/styled';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Link';

import Ad from './Ad';

const FooterContent = styled('footer')(({ theme }) => ({
  padding: '1.5rem 0',
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
  boxShadow: '0 -1px 3px rgba(34, 25, 25, 0.4)',
  textAlign: 'center',
}));

const Footer = () => (
  <>
    <Ad />
    <FooterContent>
      <Grid direction="column" justify="center" container>
        <Grid item>
          <Typography align="center" color="inherit" variant="subtitle1">
            © Axel Pettersson 2019
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            align="center"
            color="inherit"
            variant="subtitle1"
            href="mailto:contact@partiguiden.nu"
          >
            contact@partiguiden.nu
          </Typography>
        </Grid>
      </Grid>
    </FooterContent>
  </>
);

export default Footer;
