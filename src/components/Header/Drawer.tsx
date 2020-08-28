import React from 'react';

import { List, ListItem, ListItemText, SwipeableDrawer, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import pages from './pages';
import Router from 'next/router';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  appBarHeight: number;
}

const Drawer: React.FC<Props> = ({ isOpen, handleClose, handleOpen, appBarHeight }) => {
  return (
    <SwipeableDrawer
      variant="temporary"
      anchor="left"
      open={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <List disablePadding component="nav">
        <ListItem style={{ height: appBarHeight }}>
          <IconButton color="inherit" aria-label="close drawer" onClick={handleClose} edge="start">
            <CloseIcon />
          </IconButton>
        </ListItem>
        {pages.map((page) => (
          <ListItem
            button
            key={page.href}
            onClick={() => {
              Router.push(page.href);
              handleClose();
            }}
          >
            <ListItemText
              disableTypography
              style={{ fontSize: '0.9rem', marginRight: '1rem', lineHeight: 1.5 }}
            >
              {page.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default Drawer;
