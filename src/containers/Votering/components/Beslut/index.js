import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { string } from 'prop-types';

import styles from '../../styles';

const useStyles = makeStyles(styles);

const Beslut = ({ beslut, notisBeskrivning }) => {
  const classes = useStyles();
  return (
    <div className={classes.contentContainer}>
      <Typography variant="h5" color="inherit" gutterBottom>
        Beslut
      </Typography>
      <Typography variant="body1">{beslut}</Typography>
      <Typography variant="h5" color="inherit" gutterBottom style={{ marginTop: '0.5rem' }}>
        Beslut i korthet
      </Typography>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: notisBeskrivning }} />
    </div>
  );
};

Beslut.propTypes = {
  beslut: string.isRequired,
  notisBeskrivning: string.isRequired
};

export default Beslut;
