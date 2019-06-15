import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const ProfilePicture = ({ src, classes, name }) => (
  <React.Fragment>
    <div className={classes.pictureContainer}>
      <div
        style={{ background: `url(${src}) 50% 50% no-repeat` }}
        className={classes.profilePicture}
      />
    </div>
    <div className={classes.nameContainer}>
      <h3>{name}</h3>
    </div>
  </React.Fragment>
);

export default withStyles(styles)(ProfilePicture);
