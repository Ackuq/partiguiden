import React, { useEffect, useState } from 'react';
import ArrowUp from '@material-ui/icons/ArrowUpwardRounded';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: '1rem',
    left: '5%',
    right: '95%',
    backgroundColor: theme.palette.grey[100],
  },

  arrow: {
    color: theme.palette.primary.dark,
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
