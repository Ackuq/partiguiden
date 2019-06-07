import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import FilterIcon from '@material-ui/icons/Tune';
import styles from './styles';

import FilterScreen from './components/FilterScreen';

const Filter = ({ classes }) => {
  const [showFilterScreen, setShowFilterScreen] = useState(false);

  return (
    <React.Fragment>
      <Card className={classes.filterContainer}>
        <Button
          classes={{ root: classes.buttonContainer }}
          onClick={() => setShowFilterScreen(!showFilterScreen)}
        >
          <FilterIcon className={classes.icon} />
        </Button>
      </Card>
      <div
        className={`${classes.filterOverlay} ${
          showFilterScreen ? classes.filterOverlayShow : classes.filterOverlayHidden
        }`}
      >
        <FilterScreen
          show={showFilterScreen}
          handleClick={() => showFilterScreen && setShowFilterScreen(false)}
        />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(Filter);
