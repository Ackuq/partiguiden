import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import makeStyles from '@material-ui/styles/makeStyles';

import { Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

const getPages = [
  { href: '/', title: 'Hem' },
  {
    href: '/partiernas-standpunkter',
    title: 'Partiernas Ståndpunkter',
  },
  { href: '/riksdagsbeslut', title: 'Riksdagsbeslut' },
  { href: '/voteringar', title: 'Voteringar' },
  { href: '/ledamoter', title: 'Ledamöter' },
  { href: '/om-oss', title: 'Om oss' },
];

const getIndex = (val: number, { route, pathname }: { route: string; pathname: string }) => {
  let index = getPages.findIndex((x) => x.href === pathname);

  if (index < 0) {
    if (route === '/standpunkter/[id]') index = 1;
    else if (route === '/votering/[id]/[bet]') index = 3;
    else if (route === '/ledamot/[id]') index = 4;
    else index = val;
  }

  return index;
};

const NavLinks: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();

  const [value, setValue] = useState(getIndex(0, router));

  useEffect(() => {
    window.scrollTo(0, 0);
    setValue(getIndex(value, router));
  }, [router.pathname]);

  return (
    <AppBar position="sticky">
      <Tabs
        variant="scrollable"
        classes={{
          scrollButtons: classes.scrollButton,
          scroller: classes.scrollTab,
        }}
        value={value}
      >
        {getPages.map(({ href, title }) => (
          <Tab
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
    </AppBar>
  );
};

export default NavLinks;
