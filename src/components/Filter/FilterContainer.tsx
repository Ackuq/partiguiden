import React, { useState } from 'react';

import { Fab, SwipeableDrawer, Hidden, IconButton } from '@material-ui/core';
import { makeStyles, darken } from '@material-ui/core/styles';

import { Tune as FilterIcon, CloseRounded as CloseIcon } from '@material-ui/icons';

import FilterContainerDesktop from './FilterContainerDesktop';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: '1rem',
    right: '5%',
    color: theme.palette.type === 'dark' ? 'white' : 'black',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: darken(theme.palette.background.paper, 0.25),
    },
  },
}));

const Filter: React.FC<{ children: React.ReactChild | React.ReactChild[] }> = ({ children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleFilterScreen = () => setMobileOpen((prevState) => !prevState);

  return (
    <>
      <Hidden smUp>
        <Fab classes={{ root: classes.fab }} onClick={toggleFilterScreen}>
          <FilterIcon color="inherit" fontSize="large" />
        </Fab>

        <SwipeableDrawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={() => toggleFilterScreen()}
          onOpen={() => toggleFilterScreen()}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton aria-label="Close" onClick={toggleFilterScreen}>
              <CloseIcon />
            </IconButton>
          </div>
          {children}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown>
        <FilterContainerDesktop>{children}</FilterContainerDesktop>
      </Hidden>
    </>
  );
};

export default Filter;
