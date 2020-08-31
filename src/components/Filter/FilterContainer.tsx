import React, { useState } from 'react';

import Fab from '@material-ui/core/Fab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import FilterIcon from '@material-ui/icons/Tune';
import CloseIcon from '@material-ui/icons/CloseRounded';

import FilterContainerDesktop from './FilterContainerDesktop';

const Filter: React.FC<{ children: React.ReactChild | React.ReactChild[] }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleFilterScreen = () => setMobileOpen((prevState) => !prevState);

  return (
    <>
      <Hidden smUp implementation="css">
        <div style={{ position: 'fixed', bottom: '1rem', right: '5%' }}>
          <Fab style={{ backgroundColor: '#fff' }} onClick={toggleFilterScreen}>
            <FilterIcon fontSize="large" />
          </Fab>
        </div>

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
      <Hidden xsDown implementation="css">
        <FilterContainerDesktop>{children}</FilterContainerDesktop>
      </Hidden>
    </>
  );
};

export default Filter;
