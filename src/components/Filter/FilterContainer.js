import React, { useState } from 'react';
import { Fab, SwipeableDrawer, Hidden, IconButton } from '@material-ui/core';
import { Tune as FilterIcon, CloseRounded as CloseIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

import FilterContainerDesktop from './FilterContainerDesktop';

const Filter = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleFilterScreen = () => setMobileOpen(prevState => !prevState);

  return (
    <React.Fragment>
      <Hidden smUp>
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
      <Hidden xsDown>
        <FilterContainerDesktop>{children}</FilterContainerDesktop>
      </Hidden>
    </React.Fragment>
  );
};

Filter.propTypes = {
  children: PropTypes.PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};

export default Filter;
