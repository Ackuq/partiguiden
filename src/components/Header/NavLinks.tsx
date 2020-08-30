import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';

import makeStyles from '@material-ui/styles/makeStyles';

import { Menu, MenuItem, Theme } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import pages from './pages';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  [theme.breakpoints.up('sm')]: {
    scrollButton: {
      display: 'none',
    },
    scrollTab: {
      overflow: 'hidden',
    },
  },
  partySelect: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: '0 !important',
    visibility: 'hidden',
  },
}));

interface DropDownProps {
  title: string;
  href: string;
  subPages: Array<{ title: string; id: string }>;
}

const DropDown: React.FC<DropDownProps> = ({ title, href, subPages }) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const urlPrefix = href.replace(/\s*\[.*?\]\s*/g, '');

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Tab label={title} onClick={handleOpen} />
      <Menu keepMounted anchorEl={anchor} open={!!anchor} onClose={handleClose}>
        {subPages.map((page) => (
          <Link key={page.id} href={href} as={`${urlPrefix}${page.id}`}>
            <a>
              <MenuItem>{page.title}</MenuItem>
            </a>
          </Link>
        ))}
      </Menu>
    </div>
  );
};

const hrefArray = pages.map((page) => page.href);

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
      value={
        hrefArray.some((href) => href === router.pathname) && hrefArray.indexOf(router.pathname)
      }
    >
      {pages.map(({ href, title, subPages }) =>
        subPages ? (
          <DropDown key={href} title={title} href={href} subPages={subPages} />
        ) : (
          <Tab
            key={href}
            component={({ children, ...rest }) => (
              <Link href={href}>
                <a {...rest}>{children}</a>
              </Link>
            )}
            href={href}
            label={title}
          />
        )
      )}
    </Tabs>
  );
};

export default NavLinks;
