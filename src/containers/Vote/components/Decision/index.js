import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { string } from 'prop-types';

import styles from '../../styles';

const useStyles = makeStyles(styles);

const Decision = ({ decision, description }) => {
  const classes = useStyles();
  return (
    <div className={classes.contentContainer}>
      <Typography variant="h5" color="inherit" gutterBottom>
        Beslut
      </Typography>
      <Typography variant="body1">{decision}</Typography>
      <Typography variant="h5" color="inherit" gutterBottom style={{ marginTop: '0.5rem' }}>
        Beslut i korthet
      </Typography>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

Decision.propTypes = {
  decision: string.isRequired,
  description: string.isRequired,
};

export default Decision;
