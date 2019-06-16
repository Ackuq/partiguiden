import React, { useState } from 'react';
import { withStyles, styled } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Tune as FilterIcon, CloseRounded as CloseIcon } from '@material-ui/icons';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import styles from './styles';

const CloseButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none'
  },
  padding: '0.35rem',
  position: 'absolute',
  top: '5px',
  right: '15px'
}));

const Filter = ({ classes, children }) => {
  const [showFilterScreen, setShowFilterScreen] = useState(false);

  const showClass = showFilterScreen ? classes.showFilterScreen : '';

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
        <ClickAwayListener
          onClickAway={event => {
            if (showClass) {
              event.preventDefault();
              setShowFilterScreen(false);
            }
          }}
        >
          <div className={`${classes.filterScreenContainer} ${showClass}`}>
            <CloseButton aria-label="Close" onClick={() => setShowFilterScreen(false)}>
              <CloseIcon />
            </CloseButton>
            {children}
          </div>
        </ClickAwayListener>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(Filter);
