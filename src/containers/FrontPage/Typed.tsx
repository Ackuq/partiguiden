import React from 'react';
import styled from '@material-ui/styles/styled';

import Typed from 'react-typed';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const PageTitleContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  textAlign: 'center',
  padding: '1.5rem 0.25rem',
  marginBottom: '1rem',
  color: '#fff',
  minHeight: '5rem',
}));

const TypedComponent = () => (
  <PageTitleContainer square>
    <Typography variant="h4" paragraph>
      Hur vill Sveriges partier förbättra
    </Typography>
    <Typography variant="h4">
      <Typed
        strings={['miljön?', 'jämlikheten?', 'vården?', 'Sverige?']}
        typeSpeed={100}
        showCursor={false}
      />
      &nbsp;
    </Typography>
  </PageTitleContainer>
);

export default TypedComponent;
