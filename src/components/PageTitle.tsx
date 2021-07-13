import React from 'react';

import { Typography, TypographyProps, Paper } from '@material-ui/core';
import { styled, Theme } from '@material-ui/core/styles';

const PageTitleContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  zIndex: 99,
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.primary.light,
  textAlign: 'center',
  padding: '1.5rem 0.25rem',
  marginBottom: '1rem',
  color: '#fff',
  minHeight: '5rem',
}));

interface Props extends TypographyProps {
  title: string;
  Icon?: React.ElementType;
}

const PageTitle: React.FC<Props> = ({ title, variant = 'h3', Icon }) => (
  <PageTitleContainer square>
    {Icon && <Icon style={{ fontSize: '2.5rem' }} />}
    <Typography variant={variant} component="h1">
      {title}
    </Typography>
  </PageTitleContainer>
);

export default PageTitle;
