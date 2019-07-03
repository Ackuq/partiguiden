import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Card } from '@material-ui/core';
import { Tune as FilterIcon, CloseRounded as CloseIcon } from '@material-ui/icons';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';

import CloseButton from './CloseButton';
import styles from './styles';

const useStyles = makeStyles(styles);

const Filter = ({ children }) => {
  const classes = useStyles();
  const [showFilterScreen, setShowFilterScreen] = useState(false);

  const toggleFilterScreen = () => setShowFilterScreen(prevState => !prevState);

  const showClass = showFilterScreen ? classes.showFilterScreen : '';

  return (
    <React.Fragment>
      <Card classes={{ root: classes.filterButtonContainer }}>
        <Button classes={{ root: classes.buttonContainer }} onClick={toggleFilterScreen}>
          <FilterIcon className={classes.icon} />
        </Button>
      </Card>
      <div
        className={`${classes.filterOverlay} ${
          showFilterScreen ? classes.filterOverlayShow : classes.filterOverlayHidden
        }`}
      >
        <ClickAwayListener
          onClickAway={event => {
            if (showClass) {
              event.preventDefault();
              toggleFilterScreen();
            }
          }}
        >
          <div className={`${classes.filterScreenContainer} ${showClass}`}>
            <CloseButton aria-label="Close" onClick={toggleFilterScreen}>
              <CloseIcon />
            </CloseButton>
            {children}
          </div>
        </ClickAwayListener>
      </div>
    </React.Fragment>
  );
};

Filter.propTypes = {
  children: PropTypes.PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
};

export default Filter;
