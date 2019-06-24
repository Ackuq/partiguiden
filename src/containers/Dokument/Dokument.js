import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { array } from 'prop-types';
import styles from './styles';

const useStyles = makeStyles(styles);

const Dokument = ({ body }) => {
  const classes = useStyles();

  return (
    <div className={classes.dokumentBody}>
      {body.map(el => (
        <React.Fragment key={el.key || el}>{el}</React.Fragment>
      ))}
    </div>
  );
};

Dokument.propTypes = {
  body: array.isRequired
};

export default Dokument;
