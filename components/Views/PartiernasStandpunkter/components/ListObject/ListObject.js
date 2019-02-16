import React from 'react';
/* Material UI components */
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from '../../../../../lib/routes';

import styles from './styles';

const ListObject = ({ classes, subject }) => (
  <Grid item xs={12} md={6} className={classes.item}>
    <ButtonBase className={classes.button} component="div">
      <Link route="subject" params={{ id: subject.id }}>
        <a>
          <span>{subject.name}</span>
        </a>
      </Link>
    </ButtonBase>
  </Grid>
);

export default withStyles(styles)(ListObject);
