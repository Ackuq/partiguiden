import React from 'react';
import Typography from '@material-ui/core/Typography';

import useStyles from '../useStyles';

interface Props {
  decision: string;
  description: string;
}

const Decision: React.FC<Props> = ({ decision, description }) => {
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

export default Decision;
