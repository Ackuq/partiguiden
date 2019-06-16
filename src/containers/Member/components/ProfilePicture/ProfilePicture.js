import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import styles from './styles';

const ProfilePicture = ({ src, classes, name, status }) => (
  <React.Fragment>
    <div className={classes.pictureContainer}>
      <div
        style={{ background: `url(${src}) 50% 50% no-repeat` }}
        className={classes.profilePicture}
      />
    </div>
    <div className={classes.nameContainer}>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h6">{status}</Typography>
    </div>
  </React.Fragment>
);

export default withStyles(styles)(ProfilePicture);
