import React, { useState } from 'react';

import { Fab, SwipeableDrawer, Hidden, IconButton } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import styled from '@emotion/styled';

import FilterIcon from '@material-ui/icons/Tune';
import CloseIcon from '@material-ui/icons/CloseRounded';

import FilterContainerDesktop from './FilterContainerDesktop';

const CustomFab = styled(Fab)(
  ({ theme }) => `
    position: fixed;
    bottom: 1rem;
    right: 5%;
    color: ${theme.palette.mode === 'dark' ? 'white' : 'black'};
    background-color: ${theme.palette.background.paper};
    :hover {
      background-color: ${darken(theme.palette.background.paper, 0.25)};
    }
`
);

const IconButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Filter: React.FC<{ children: React.ReactChild | React.ReactChild[] }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleFilterScreen = () => setMobileOpen((prevState) => !prevState);

  return (
    <>
      <Hidden smUp>
        <CustomFab onClick={toggleFilterScreen}>
          <FilterIcon color="inherit" fontSize="large" />
        </CustomFab>

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
          <IconButtonContainer>
            <IconButton aria-label="Close" onClick={toggleFilterScreen}>
              <CloseIcon />
            </IconButton>
          </IconButtonContainer>
          {children}
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown>
        <FilterContainerDesktop>{children}</FilterContainerDesktop>
      </Hidden>
    </>
  );
};

export default Filter;
