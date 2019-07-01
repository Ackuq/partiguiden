import React from 'react';
import Link from 'next/link';
import { Grid, ButtonBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import styles from './styles';

const useStyles = makeStyles(styles);

const ListObject = ({ subject }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6} className={classes.item}>
      <ButtonBase className={classes.button}>
        <Link href={`/subject?id=${subject.id}`} as={`/subject/${subject.id}`}>
          <Typography component="a">
            <span className={classes.transition}>{subject.name}</span>
          </Typography>
        </Link>
      </ButtonBase>
    </Grid>
  );
};

ListObject.propTypes = {
  subject: PropTypes.object.isRequired
};

export default ListObject;
