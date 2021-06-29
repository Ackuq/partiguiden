import React from 'react';
import Link from 'next/link';

import { Breadcrumbs, Chip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { makeStyles } from '@material-ui/core/styles';

import { INDEX } from '../lib/routes';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  links: Array<{ href: string; as?: string; label: string }>;
}

const CustomBreadcrumbs: React.FC<Props> = ({ links }) => {
  const classes = useStyles();
  return (
    <Breadcrumbs
      aria-label="Breadcrumbs"
      classes={{
        li: classes.chip,
        separator: classes.chip,
      }}
    >
      <Link href={INDEX} passHref>
        <Chip component="a" label="Hem" variant="outlined" icon={<HomeIcon fontSize="small" />} />
      </Link>
      {links.map((link) => (
        <Link href={link.href} as={link.as} key={link.label} passHref>
          <Chip component="a" label={link.label} variant="outlined" />
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export type BreadcrumbsProps = Props;

export default CustomBreadcrumbs;
