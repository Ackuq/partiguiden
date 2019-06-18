import React from 'react';
import ScrollUp from 'react-scroll-up';
import { makeStyles } from '@material-ui/styles';
import ArrowUpRounded from '@material-ui/icons/ArrowUpwardRounded';
import ButtonBase from '@material-ui/core/ButtonBase';

import styles from './styles';

const useStyles = makeStyles(styles);

const ToTopButton = () => {
  const classes = useStyles();
  return (
    <ScrollUp showUnder={500} style={{ bottom: '1rem', left: '5%', right: '95%' }}>
      <ButtonBase classes={{ root: classes.circleButton }}>
        <ArrowUpRounded classes={{ root: classes.arrow }} />
      </ButtonBase>
    </ScrollUp>
  );
};

export default ToTopButton;
