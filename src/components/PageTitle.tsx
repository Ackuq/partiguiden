import React from 'react';

import styled from '@material-ui/styles/styled';

import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core';

const PageTitleContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  zIndex: 99,
  backgroundColor:
    theme.palette.type == 'dark' ? theme.palette.background.paper : theme.palette.primary.light,
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
