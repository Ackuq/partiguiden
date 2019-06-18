import React from 'react';
import { Grid, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import { Router } from '../../../../lib/routes';
import styles from './styles';

const useStyles = makeStyles(styles);

const ListObject = ({ subject }) => {
  const classes = useStyles();
  return (
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
};

ListObject.propTypes = {
  subject: PropTypes.object.isRequired
};

export default ListObject;
