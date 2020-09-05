import React, { useEffect, useMemo, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';

import makeStyles from '@material-ui/styles/makeStyles';

import { Menu, MenuItem, Theme } from '@material-ui/core';
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
  router: NextRouter;
}

const DropDown: React.FC<DropDownProps> = ({ title, href, subPages, router }) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const urlPrefix = href.replace(/\s*\[.*?\]\s*/g, '');

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  useEffect(() => {
    handleClose();
  }, [router.asPath]);

  return (
    <div style={{ position: 'relative' }}>
      <Tab label={title} onClick={handleOpen} />
      <Menu keepMounted anchorEl={anchor} open={!!anchor} onClose={handleClose}>
        {subPages.map((page) => (
          <div key={page.id}>
            <Link href={href} as={`${urlPrefix}${page.id}`} passHref>
              <a style={{ color: 'inherit', textDecoration: 'none' }}>
                <MenuItem>{page.title}</MenuItem>
              </a>
            </Link>
          </div>
        ))}
      </Menu>
    </div>
  );
};

interface CustomTabProps {
  href: string;
  title: string;
}

const CustomTabInner: React.ForwardRefRenderFunction<HTMLAnchorElement, CustomTabProps> = (
  { href, title },
  ref
) => (
  <Link href={href}>
    <Tab ref={ref} href={href} label={title} />
  </Link>
);

const CustomTab = React.forwardRef<HTMLAnchorElement, CustomTabProps>(CustomTabInner);

const NavLinks: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();

  const selectedTab = useMemo(() => {
    const index = pages.findIndex(
      (page) =>
        page.href === router.pathname ||
        (page.associated && page.associated.includes(router.pathname))
    );
    return index === -1 ? false : index;
  }, [router.pathname]);

  return (
    <Tabs
      variant="scrollable"
      classes={{
        scrollButtons: classes.scrollButton,
        scroller: classes.scrollTab,
      }}
      value={selectedTab}
    >
      {pages.map(({ href, title, subPages }) =>
        subPages ? (
          <DropDown key={href} title={title} href={href} subPages={subPages} router={router} />
        ) : (
          <CustomTab key={href} href={href} title={title} />
        )
      )}
    </Tabs>
  );
};

export default NavLinks;
