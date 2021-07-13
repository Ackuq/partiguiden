import React, { useEffect, useState } from 'react';

import ArrowUpIcon from '@material-ui/icons/ArrowUpwardRounded';

import { Fab, Zoom } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import styled from '@emotion/styled';

const CustomFab = styled(Fab)`
  position: fixed;
  bottom: 1rem;
  left: 5%;
  right: 95%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  :hover {
    background-color: ${({ theme }) => darken(theme.palette.background.paper, 0.25)};
  }
`;

const CustomArrow = styled(ArrowUpIcon)`
  color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark};
`;

const showUnder = 500;

const ToTopButton: React.FC = () => {
  const [show, setShow] = useState(false);

  const showFab = () => {
    const isUnder = window.pageYOffset > showUnder;
    if (isUnder) {
      setShow(true);
    } else if (!isUnder) {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', showFab);
    return () => {
      window.removeEventListener('scroll', showFab);
    };
  }, []);
  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={show}>
      <CustomFab onClick={scrollToTop} size="large">
        <CustomArrow fontSize="large" />
      </CustomFab>
    </Zoom>
  );
};

export default ToTopButton;
