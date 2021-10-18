import React, { useState } from 'react';

import { Fab, SwipeableDrawer, IconButton, useMediaQuery, Theme } from '@mui/material';
import { darken, styled } from '@mui/material/styles';

import FilterIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/CloseRounded';

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

const IconButtonContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

const Filter: React.FC<{ children: React.ReactChild | React.ReactChild[] }> = ({ children }) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleFilterScreen = () => setMobileOpen((prevState) => !prevState);

  return isMobile ? (
    <>
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
    </>
  ) : (
    <FilterContainerDesktop>{children}</FilterContainerDesktop>
  );
};

export default Filter;
