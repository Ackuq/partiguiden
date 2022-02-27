import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { styled } from '@mui/material/styles';

import pages from './pages';
interface ListItemProps {
  title: string;
  href: string;
  Icon?: typeof SvgIcon | (() => JSX.Element);
  linkAs?: string;
}

const CustomListItem: React.FC<ListItemProps> = ({ title, href, linkAs, Icon }) => (
  <Link href={href} as={linkAs} passHref>
    <a style={{ color: 'inherit', textDecoration: 'none' }}>
      <ListItem button key={href}>
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={title} />
      </ListItem>
    </a>
  </Link>
);

const DropDownListItem = styled(CustomListItem)`
  padding-left: ${({ theme }) => theme.spacing(4)};
`;

interface DropDownProps {
  title: string;
  href: string;
  subPages: Array<{ title: string; id: string; Icon: typeof SvgIcon | (() => JSX.Element) }>;
  Icon?: typeof SvgIcon | (() => JSX.Element);
}

const DropDown: React.FC<DropDownProps> = ({ title, href, subPages, Icon }) => {
  const [open, setOpen] = useState(false);

  const urlPrefix = href.replace(/\s*\[.*?\]\s*/g, '');

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open}>
        <List component="div">
          {subPages.map((page) => (
            <DropDownListItem
              key={page.id}
              title={page.title}
              Icon={page.Icon}
              href={href}
              linkAs={`${urlPrefix}${page.id}`}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  appBarHeight: number;
}

const Drawer: React.FC<Props> = ({ isOpen, handleClose, handleOpen, appBarHeight }) => {
  const router = useRouter();

  useEffect(() => {
    handleClose();
  }, [router.asPath, handleClose]);

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
        {pages.map((page) =>
          page.subPages ? (
            <DropDown
              key={page.href}
              title={page.title}
              subPages={page.subPages}
              Icon={page.Icon}
              href={page.href}
            />
          ) : (
            <CustomListItem key={page.href} title={page.title} Icon={page.Icon} href={page.href} />
          )
        )}
      </List>
    </SwipeableDrawer>
  );
};

export default Drawer;
