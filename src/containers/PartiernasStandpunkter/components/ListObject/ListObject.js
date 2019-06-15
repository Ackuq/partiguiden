import React from 'react';
import { Grid, ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Router } from '../../../../lib/routes';
import styles from './styles';

const ListObject = ({ classes, subject }) => (
  <Grid item xs={12} md={6} className={classes.item}>
    <ButtonBase
      className={classes.button}
      component="div"
      onClick={() => Router.pushRoute('subject', { id: subject.id })}
    >
      <p>{subject.name}</p>
    </ButtonBase>
  </Grid>
);

export default withStyles(styles)(ListObject);
