import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';
import FilterIcon from '@material-ui/icons/Tune';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import styles from './styles';

const Filter = ({ classes, children }) => {
  const [showFilterScreen, setShowFilterScreen] = useState(false);

  const showClass = showFilterScreen ? classes.showFilterScreen : '';

  const handleClick = () => showClass && setShowFilterScreen(false);

  return (
    <React.Fragment>
      <Card classes={{ root: classes.filterButtonContainer }}>
        <Button
          classes={{ root: classes.buttonContainer }}
          onClick={() => setShowFilterScreen(true)}
        >
          <FilterIcon className={classes.icon} />
        </Button>
      </Card>
      <div
        className={`${classes.filterOverlay} ${
          showFilterScreen ? classes.filterOverlayShow : classes.filterOverlayHidden
        }`}
      >
        <ClickAwayListener onClickAway={handleClick}>
          <div className={`${classes.filterScreenContainer} ${showClass}`}>{children}</div>
        </ClickAwayListener>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(Filter);
