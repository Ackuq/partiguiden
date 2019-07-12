import React from 'react';
import { styled } from '@material-ui/styles';
import { ButtonBase } from '@material-ui/core';
import { func } from 'prop-types';

const Button = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '1rem',
  height: '2rem',
  padding: '0 2rem',
  margin: '1.5rem auto 1rem auto',
}));

const LoadMoreButton = ({ onClick }) => <Button onClick={onClick}>Ladda mer</Button>;

LoadMoreButton.propTypes = {
  onClick: func.isRequired,
};

export default LoadMoreButton;
