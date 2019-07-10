import React, { useState } from 'react';
import { Fab, SwipeableDrawer, Box, Hidden, IconButton } from '@material-ui/core';
import { Tune as FilterIcon, CloseRounded as CloseIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

const Filter = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleFilterScreen = () => setMobileOpen(prevState => !prevState);

  return (
    <React.Fragment>
      <Hidden smUp implementation="js">
        <Box position="fixed" bottom="1rem" right="5%">
          <Fab style={{ backgroundColor: '#fff' }} onClick={toggleFilterScreen}>
            <FilterIcon fontSize="large" />
          </Fab>
        </Box>

        <SwipeableDrawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={() => toggleFilterScreen()}
          onOpen={() => toggleFilterScreen()}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton aria-label="Close" onClick={toggleFilterScreen}>
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Box
          boxShadow={2}
          position="sticky"
          display="flex"
          flexDirection="column"
          height="100%"
          minWidth={255}
          maxHeight="calc(100vh - 48px)"
          bgcolor="#fff"
          top={48}
          mt="-1rem"
          style={{ overflowY: 'auto', overflowX: 'hidden' }}
        >
          {children}
        </Box>
      </Hidden>
    </React.Fragment>
  );
};

Filter.propTypes = {
  children: PropTypes.PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
};

export default Filter;
