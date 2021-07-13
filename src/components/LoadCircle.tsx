import React from 'react';

import { CircularProgress } from '@material-ui/core';
import styled from '@emotion/styled';

const FullLoadCircle = styled(CircularProgress)`
  display: flex;
  margin: auto;
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;

const LoadCircle: React.FC = () => <FullLoadCircle title="Circular loader" size={100} />;

export default LoadCircle;
