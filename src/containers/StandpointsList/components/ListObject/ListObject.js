import React from 'react';
import Router from 'next/router';
import { Grid, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import styles from './styles';

const useStyles = makeStyles(styles);

const ListObject = ({ subject }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6} className={classes.item}>
      <ButtonBase
        component="a"
        href={`/standpunkter/${subject.id}`}
        className={classes.button}
        onClick={event => {
          event.preventDefault();
          Router.push('/standpunkter/[id]', `/standpunkter/${subject.id}`);
        }}
      >
        <span className={classes.transition}>{subject.name}</span>
      </ButtonBase>
    </Grid>
  );
};

ListObject.propTypes = {
  subject: PropTypes.object.isRequired,
};

export default ListObject;
