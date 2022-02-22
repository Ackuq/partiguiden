import React from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';

const FooterContent = styled('footer')`
  padding: 1.5rem 0;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.primary.main};
  box-shadow: 0 -1px 3px rgba(34, 25, 25, 0.4);
  text-align: center;
`;

const Footer: React.FC = () => (
  <FooterContent>
    <Stack>
      <Typography align="center" color="inherit" variant="subtitle1" component="span">
        © Axel Pettersson 2021
      </Typography>
      <Link align="center" color="inherit" variant="subtitle1" href="mailto:hello@partiguiden.se">
        hello@partiguiden.se
      </Link>
    </Stack>
  </FooterContent>
);

export default Footer;
