import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { object } from 'prop-types';

import styles from './styles';

const useStyles = makeStyles(styles);

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

const NavLinks = ({ router }) => {
  const classes = useStyles();

  const getIndex = val => {
    const { route } = router;

    let index = getPages.findIndex(x => x.href === router.pathname);

    if (index < 0) {
      if (route === '/standpunkter/[id]') index = 1;
      else if (route === '/votering/[id]/[bet]') index = 3;
      else if (route === '/ledamot/[id]') index = 4;
      else index = val;
    }

    return index;
  };

  const [value, setValue] = useState(getIndex(0));

  useEffect(() => {
    window.scrollTo(0, 0);
    setValue(getIndex(value));
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
            onClick={event => {
              event.preventDefault();
              Router.push(href);
            }}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

NavLinks.propTypes = {
  router: object.isRequired,
};

export default withRouter(NavLinks);
