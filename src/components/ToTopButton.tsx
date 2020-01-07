import React from 'react';
import ScrollUp from 'react-scroll-up';
import styled from '@material-ui/styles/styled';
import ArrowUpRounded from '@material-ui/icons/ArrowUpwardRounded';
import ButtonBase from '@material-ui/core/ButtonBase';

const ArrowUp = styled(ArrowUpRounded)(({ theme }) => ({
  fontSize: '4rem',
  color: theme.palette.primary.dark,
}));

const ToTopButton = () => (
  <ScrollUp showUnder={500} style={{ bottom: '1rem', left: '5%', right: '95%' }}>
    <ButtonBase style={{ borderRadius: '2rem' }}>
      <ArrowUp />
    </ButtonBase>
  </ScrollUp>
);

export default ToTopButton;
