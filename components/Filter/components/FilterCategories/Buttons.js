import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from './styles';

const Buttons = ({ classes, loadAll, setLoadAll }) => (
  <React.Fragment>
    {loadAll ? (
      <Button onClick={() => setLoadAll(false)} classes={{ root: classes.showMoreButton }}>
        Visa mindre
      </Button>
    ) : (
      <Button onClick={() => setLoadAll(true)} classes={{ root: classes.showMoreButton }}>
        Visa mer
      </Button>
    )}
  </React.Fragment>
);

export default withStyles(styles)(Buttons);
