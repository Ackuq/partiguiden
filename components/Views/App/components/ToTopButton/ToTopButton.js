import React from 'react';
import ScrollUp from 'react-scroll-up';

/* Material ui */
import { withStyles } from '@material-ui/core/styles';
import ArrowUpRounded from '@material-ui/icons/ArrowUpwardRounded';
import ButtonBase from '@material-ui/core/ButtonBase';

import styles from './styles';

const ToTopButton = ({ classes }) => (
  <ScrollUp showUnder={500} style={{ bottom: '1rem', left: '5%', right: '95%' }}>
    <ButtonBase classes={{ root: classes.circleButton }}>
      <ArrowUpRounded classes={{ root: classes.arrow }} />
    </ButtonBase>
  </ScrollUp>
);

export default withStyles(styles)(ToTopButton);
