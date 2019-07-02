import React from 'react';
import Link from 'next/link';
import { emphasize, withStyles, styled } from '@material-ui/core/styles';
import { Breadcrumbs, Chip, Avatar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { array } from 'prop-types';

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300]
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  background: 'none',
  color: '#616161',
  width: '32px',
  height: '32px',
  fontSize: '1rem',
  marginRight: -theme.spacing(1.5)
}));

const CustomBreadcrumbs = ({ links }) => (
  <Breadcrumbs aria-label="Breadcrumb">
    <Link href="/">
      <StyledBreadcrumb
        component="a"
        href="/"
        label="Hem"
        avatar={
          <CustomAvatar>
            <HomeIcon />
          </CustomAvatar>
        }
      />
    </Link>
    {links.map(link => (
      <Link href={link.href} key={link.label}>
        <StyledBreadcrumb component="a" href={link.href} label={link.label} />
      </Link>
    ))}
  </Breadcrumbs>
);

CustomBreadcrumbs.propTypes = {
  links: array.isRequired
};

export default CustomBreadcrumbs;
