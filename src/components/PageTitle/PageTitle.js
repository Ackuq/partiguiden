import React from 'react';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const PageTitleContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  textAlign: 'center',
  padding: '1.5rem 0.25rem',
  marginBottom: '1rem',
  color: '#fff',
  minHeight: '5rem'
}));

const PageTitle = ({ title, variant = 'h1', Icon }) => (
  <PageTitleContainer square>
    {Icon && <Icon style={{ fontSize: '2.5rem' }} />}
    <Typography variant={variant}>{title}</Typography>
  </PageTitleContainer>
);

export default PageTitle;
