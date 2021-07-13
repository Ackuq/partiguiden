import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  IconButton,
  Collapse,
  ListItemIcon,
  SvgIcon,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/Close';

import styled from '@emotion/styled';
import pages from './pages';

interface ListItemProps {
  title: string;
  href: string;
  Icon?: typeof SvgIcon | (() => JSX.Element);
  as?: string;
  className?: string;
}

const CustomListItem: React.FC<ListItemProps> = ({ title, href, as, Icon, className }) => (
  <Link href={href} as={as} passHref>
    <a style={{ color: 'inherit', textDecoration: 'none' }}>
      <ListItem button key={href} className={className}>
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

/* const useStyles = makeStyles((theme: Theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
 */

interface DropDownProps extends ListItemProps {
  subPages: Array<{ title: string; id: string; Icon: typeof SvgIcon | (() => JSX.Element) }>;
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
              as={`${urlPrefix}${page.id}`}
              // className={classes.nested}
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
            <DropDown key={page.href} {...page} />
          ) : (
            <CustomListItem key={page.href} {...page} />
          )
        )}
      </List>
    </SwipeableDrawer>
  );
};

export default Drawer;
