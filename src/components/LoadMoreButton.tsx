import React from 'react';
import styled from '@material-ui/styles/styled';
import ButtonBase from '@material-ui/core/ButtonBase';

const Button = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '1rem',
  height: '2rem',
  padding: '0 2rem',
  margin: '1.5rem auto 1rem auto',
}));

const LoadMoreButton: React.FC<{ onClick: (event?: any) => any }> = ({ onClick }) => (
  <Button onClick={onClick}>Ladda mer</Button>
);

export default LoadMoreButton;
