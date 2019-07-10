import React from 'react';
import { styled } from '@material-ui/styles';
import { ButtonBase, Box } from '@material-ui/core';
import { func } from 'prop-types';

const Button = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '1rem',
  height: '2rem',
  padding: '0 2rem'
}));

const LoadMoreButton = ({ onClick }) => (
  <Box display="flex" justifyContent="center" mt={3} mb={2}>
    <Button onClick={onClick}>Ladda mer</Button>
  </Box>
);

LoadMoreButton.propTypes = {
  onClick: func.isRequired
};

export default LoadMoreButton;
