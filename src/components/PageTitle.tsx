import React from 'react';

import styled from '@material-ui/styles/styled';

import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const PageTitleContainer = styled(Paper)(({ theme }) => ({
  zIndex: 99,
  backgroundColor: theme.palette.primary.light,
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

const PageTitle: React.FC<Props> = ({ title, variant = 'h1', Icon, ...rest }) => (
  <PageTitleContainer square>
    {Icon && <Icon style={{ fontSize: '2.5rem' }} />}
    <Typography variant={variant} {...rest}>
      {title}
    </Typography>
  </PageTitleContainer>
);

export default PageTitle;
