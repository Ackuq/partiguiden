import React, { useEffect, useState } from 'react';

import { ArrowUpwardRounded as ArrowUp } from '@material-ui/icons';

import { Theme, Fab, Zoom } from '@material-ui/core';
import { darken, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: '1rem',
    left: '5%',
    right: '95%',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: darken(theme.palette.background.paper, 0.25),
    },
  },

  arrow: {
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
  },
}));

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

  const classes = useStyles();
  return (
    <Zoom in={show}>
      <Fab onClick={scrollToTop} classes={{ root: classes.fab }} size="large">
        <ArrowUp classes={{ root: classes.arrow }} fontSize="large" />
      </Fab>
    </Zoom>
  );
};

export default ToTopButton;
