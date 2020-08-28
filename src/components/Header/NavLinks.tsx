import React from 'react';
import Router, { useRouter } from 'next/router';

import makeStyles from '@material-ui/styles/makeStyles';

import { Theme } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import pages from './pages';

const useStyles = makeStyles((theme: Theme) => ({
  [theme.breakpoints.up('sm')]: {
    scrollButton: {
      display: 'none',
    },
    scrollTab: {
      overflow: 'hidden',
    },
  },
}));

const NavLinks: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Tabs
      variant="scrollable"
      classes={{
        scrollButtons: classes.scrollButton,
        scroller: classes.scrollTab,
      }}
      value={pages.some((page) => page.href === router.pathname) && router.pathname}
    >
      {pages.map(({ href, title }) => (
        <Tab
          value={href}
          key={href}
          component="a"
          href={href}
          label={title}
          onClick={(event) => {
            event.preventDefault();
            Router.push(href);
          }}
        />
      ))}
    </Tabs>
  );
};

export default NavLinks;
