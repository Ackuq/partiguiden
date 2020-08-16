import React from 'react';
import styled from '@material-ui/styles/styled';
import CircularProgress from '@material-ui/core/CircularProgress';

const FullLoadCircle = styled(CircularProgress)({
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
  flex: 1,
  flexDirection: 'column',
});

const LoadCircle: React.FC = () => <FullLoadCircle size={100} />;

export default LoadCircle;
