import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';
import FilterIcon from '@material-ui/icons/Tune';

import useOnClickOutside from '../Filter/lib/useOnClickOutside';
import styles from './styles';

const Filter = ({ classes, children }) => {
  const [showFilterScreen, setShowFilterScreen] = useState(false);
  const showClass = showFilterScreen ? classes.showFilterScreen : '';
  const ref = useRef();

  const handleClick = () => showFilterScreen && setShowFilterScreen(false);

  useOnClickOutside(ref, handleClick);

  return (
    <React.Fragment>
      <Card classes={{ root: classes.filterButtonContainer }}>
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
        <div ref={ref} className={`${classes.filterScreenContainer} ${showClass}`}>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(Filter);
