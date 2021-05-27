import React from 'react';

import { CircularProgress } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const FullLoadCircle = styled(CircularProgress)({
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
  flex: 1,
  flexDirection: 'column',
});

const LoadCircle: React.FC = () => <FullLoadCircle size={100} />;

export default LoadCircle;
